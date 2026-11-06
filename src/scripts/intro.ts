import { pickApparition, type Apparition } from '../lib/apparitions';

const SEEN_KEY = 'ps-intro-seen';

// Timeline (ms), after mockup C "something in the static".
const STATIC_MS = 1500; // snow only
const VIDEO_GRACE_MS = 1000; // extra snow while a video finishes loading
const RISE_MS = 3000; // apparition fades in blurred and grows
const TREMBLE_MS = 700; // presses against the glass
const FLASH_MS = 350;
const WORD_MS = 1500; // wordmark holds, flickers once
const OUT_MS = 500;
const REDUCED_FADE_MS = 900;
const REDUCED_HOLD_MS = 500;

interface IntroData {
  pool: Apparition[];
  pinned?: string;
}

function readData(): IntroData {
  // Test-only hook: Playwright sets this to control the apparition list.
  const override = (window as unknown as { __PS_INTRO_OVERRIDE__?: IntroData }).__PS_INTRO_OVERRIDE__;
  if (override) return override;
  const el = document.getElementById('intro-data');
  try {
    return el ? (JSON.parse(el.textContent || '{}') as IntroData) : { pool: [] };
  } catch {
    return { pool: [] };
  }
}

const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function startStatic(canvas: HTMLCanvasElement, animate: boolean): () => void {
  canvas.width = 160;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const img = ctx.createImageData(canvas.width, canvas.height);
  let raf = 0;
  const draw = () => {
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 150;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v * 1.08;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(0, (performance.now() / 12) % canvas.height, canvas.width, 8);
    if (animate) raf = requestAnimationFrame(draw);
  };
  draw();
  return () => cancelAnimationFrame(raf);
}

/** Resolves true once the media can be shown, false on error or after timeoutMs. */
function whenReady(media: HTMLImageElement | HTMLVideoElement, timeoutMs: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (media instanceof HTMLImageElement && media.complete && media.naturalWidth > 0) return resolve(true);
    if (media instanceof HTMLVideoElement && media.readyState >= 3) return resolve(true);
    const ok = media instanceof HTMLVideoElement ? 'canplay' : 'load';
    const timer = setTimeout(() => resolve(false), timeoutMs);
    media.addEventListener(ok, () => (clearTimeout(timer), resolve(true)), { once: true });
    media.addEventListener('error', () => (clearTimeout(timer), resolve(false)), { once: true });
  });
}

function createMedia(a: Apparition): HTMLImageElement | HTMLVideoElement {
  if (a.kind === 'image') {
    const img = el('img', { 'data-apparition': '', alt: '', decoding: 'async' });
    img.src = a.src;
    return img;
  }
  const video = el('video', { 'data-apparition': '' });
  // Properties before src, so mobile browsers allow autoplay.
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = 'auto';
  if (a.poster) video.poster = a.poster;
  video.src = a.src;
  return video;
}

export function runIntro(): void {
  const html = document.documentElement;
  if (html.dataset.introState === 'done') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const data = readData();
  const chosen = pickApparition(data.pool ?? [], {
    pinned: data.pinned,
    preferStill: reduced || saveData,
    random: Math.random,
  });

  // Build the overlay. The visual layer is aria-hidden; the Skip button stays reachable.
  const root = el('div', { id: 'intro' });
  const screen = el('div', { class: 'intro-screen', 'aria-hidden': 'true' });
  const canvas = el('canvas');
  const flash = el('div', { 'data-flash': '' });
  const word = el('p', { class: 'intro-wordmark' });
  word.textContent = 'PANIC SIGNALS';
  const scan = el('div', { class: 'intro-scan' });
  const skip = el('button', { type: 'button', 'data-intro-skip': '' });
  skip.textContent = 'Skip';
  const media = chosen ? createMedia(chosen) : null;
  screen.append(canvas, ...(media ? [media] : []), flash, word, scan);
  root.append(screen, skip);
  document.body.prepend(root);
  html.dataset.introState = 'playing';

  const stopStatic = startStatic(canvas, !reduced);
  const abort = new AbortController();
  let finished = false;

  const release = (m: HTMLImageElement | HTMLVideoElement | null) => {
    if (!m) return;
    if (m instanceof HTMLVideoElement) {
      m.pause();
      m.removeAttribute('src');
      m.load(); // abort any stalled download
    }
    m.remove();
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    abort.abort('done');
    stopStatic();
    for (const type of ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const) {
      window.removeEventListener(type, skipOnInput, true);
    }
    release(media);
    root.remove();
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode: intro just plays again next time */
    }
    html.dataset.introState = 'done';
    document.getElementById('content')?.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('ps:intro-done'));
  };

  // Any input skips; the Skip button itself is left to its own click handler so the click completes.
  const skipOnInput = (e: Event) => {
    if (e.target instanceof Node && skip.contains(e.target)) return;
    finish();
  };
  skip.addEventListener('click', finish);
  for (const type of ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const) {
    window.addEventListener(type, skipOnInput, { capture: true, passive: true });
  }

  const animate = (node: Element, keyframes: Keyframe[], duration: number, easing = 'ease') =>
    node.animate(keyframes, { duration, easing, fill: 'forwards' }).finished;

  const play = reduced ? playReduced : playFull;
  // Skips reject with an abort (finish already ran); any real error also ends the intro
  // so a visitor is never left behind the overlay. finish() is safe to call twice.
  play().then(finish, finish);

  async function playReduced() {
    const s = abort.signal;
    if (media) {
      const ok = await whenReady(media, 1000);
      if (ok) media.style.opacity = '0.35';
      else release(media);
    }
    await animate(word, [{ opacity: 0 }, { opacity: 1 }], REDUCED_FADE_MS);
    await sleep(REDUCED_HOLD_MS, s);
  }

  async function playFull() {
    const s = abort.signal;
    const ready = media ? whenReady(media, STATIC_MS + VIDEO_GRACE_MS) : Promise.resolve(false);
    await sleep(STATIC_MS, s);

    const showMedia = media ? await ready : false;
    if (s.aborted) return;
    if (media && !showMedia) release(media);

    if (showMedia && media) {
      if (media instanceof HTMLVideoElement) media.play().catch(() => {});
      await animate(
        media,
        [
          { opacity: 0, transform: 'scale(0.6)', filter: 'blur(10px)' },
          { opacity: 0.55, transform: 'scale(1)', filter: 'blur(5px)', offset: 0.6 },
          { opacity: 0.9, transform: 'scale(1.25)', filter: 'blur(1.5px) drop-shadow(0 0 24px #cfe3ff)' },
        ],
        RISE_MS,
        'ease-in',
      );
      await animate(
        media,
        [
          { opacity: 0.9, transform: 'scale(1.25) translate(0, 0)', filter: 'blur(1px) drop-shadow(0 0 24px #cfe3ff)' },
          { opacity: 0.9, transform: 'scale(1.28) translate(3px, -1px)', filter: 'blur(1px) drop-shadow(0 0 24px #cfe3ff)', offset: 0.25 },
          { opacity: 0.9, transform: 'scale(1.25) translate(-3px, 1px)', filter: 'blur(1px) drop-shadow(0 0 24px #cfe3ff)', offset: 0.5 },
          { opacity: 0.9, transform: 'scale(1.3) translate(2px, 0)', filter: 'blur(1px) drop-shadow(0 0 24px #cfe3ff)', offset: 0.75 },
          { opacity: 0.95, transform: 'scale(1.32)', filter: 'blur(0) drop-shadow(0 0 30px #fff)' },
        ],
        TREMBLE_MS,
        'linear',
      );
    } else {
      // Nothing to push through: let the snow build a little longer.
      await sleep(RISE_MS / 2, s);
    }

    const flashDone = animate(flash, [{ opacity: 0 }, { opacity: 0.9, offset: 0.25 }, { opacity: 0 }], FLASH_MS);
    release(media);
    stopStatic();
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    await animate(
      word,
      [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 0.2, offset: 0.16 }, { opacity: 1, offset: 0.22 }, { opacity: 1 }],
      WORD_MS,
      'linear',
    );
    await flashDone;
    await animate(root, [{ opacity: 1 }, { opacity: 0 }], OUT_MS);
  }
}
