# panicsignals.tv Phase 1 (Band Site + Deckard Placeholder) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Panic Signals band site to GitHub Pages at panicsignals.tv. It has a CRT "something in the static" intro, band sections, shows, a Formspree booking form, and a software list with a Deckard placeholder page.

**Architecture:** A static Astro site. Owner-editable content lives in Markdown content collections and in one YAML settings file. Pure TypeScript modules (config loading, show filtering, apparition picking) are unit-tested with Vitest. The intro is a small client script, tested end to end with Playwright against the built site. A GitHub Actions workflow builds and deploys on push, nightly and on demand.

**Tech Stack:** Astro 7.x, TypeScript, Vitest 5.x, @playwright/test 1.65.x, `yaml` 2.x, Node ≥ 22.23.4 (pin Node 24 via `mise.toml`; the local Node 22.6.0 is too old for Astro 7).

**Spec:** `docs/superpowers/specs/2026-11-06-panicsignals-tv-design.md` (Phase 1 only; the Deckard manual/updates pipeline is Phase 2 and out of scope).

## Global Constraints

- Hosting: GitHub Pages, custom domain `panicsignals.tv` (`public/CNAME` containing exactly `panicsignals.tv`); Astro `site: 'https://panicsignals.tv'`, no `base`.
- Static only. No server code. No secrets in client code. The only third-party endpoint is Formspree.
- Phase 1 must not read from, fetch or modify the Deckard repo.
- Band pages: monospace everywhere, using the stack `"Courier New", Courier, ui-monospace, "SFMono-Regular", Menlo, monospace`.
- Software pages: proportional body (`system-ui, -apple-system, "Segoe UI", sans-serif`), with monospace only for the wordmark, code and `kbd`.
- The wordmark text is exactly `PANIC SIGNALS`.
- Band copy is lorem ipsum placeholder.
- Apparition files go in `public/apparitions/`. Image extensions: `.png .gif .webp`. Video extensions: `.mp4 .webm .mov`. Linked videos must be direct file URLs. YouTube/Vimeo page URLs are rejected.
- Intro: plays once per browser session (`sessionStorage` key `ps-intro-seen` = `"1"`). It has a visible Skip button, and any key, click, wheel or touch also skips. With `prefers-reduced-motion: reduce` there's no flash and no tremble: just a ≤1.5s fade to the wordmark, and video is replaced by its poster image or skipped.
- All band and show text is server-rendered HTML that's readable without JS. The intro overlay is created only by JS.
- Each content folder (`src/content/band`, `src/content/shows`, `src/content/software`, `public/apparitions`) has a `README.md` explaining how to add or edit an item.

## Review Focus

1. **Empty `public/apparitions/` and no linked videos.** The intro still runs (static → flash → wordmark) with no broken image request. Covered in Task 5 (`intro.spec.ts › no apparition`).
2. **Linked video URL 404s or stalls.** The intro must not hang. If the video hasn't fired `canplay` within 4000 ms, or fires `error`, the intro continues without it. Covered in Task 5 (`intro.spec.ts › video fails`).
3. **A show on today's date (site timezone) is still listed; a show with an invalid date fails the build; zero upcoming shows shows an empty state with a booking link.** Covered in Task 2 (unit) and Task 3 (e2e).
4. **JS disabled or crawler.** All band sections and shows are visible and the overlay is absent. Covered in Task 5 (`intro.spec.ts › no js`).
5. **Formspree returns an error or the network fails.** The visitor sees an error message, their typed values remain, and the submit button is re-enabled. Covered in Task 6.

---

## File Structure

```
mise.toml                         node = "24"
package.json                      scripts: dev, build, preview, test (vitest run), e2e (playwright test)
astro.config.mjs                  site, no integrations needed
tsconfig.json                     extends astro/tsconfigs/strict
vitest.config.ts
playwright.config.ts              webServer: `npm run build && npm run preview -- --port 4321`
.gitignore                        node_modules, dist, .astro, .superpowers/, .playwright-mcp/, test-results, playwright-report
README.md                         how to edit content, DNS setup, Formspree setup
site.config.yaml                  owner settings (Task 1)
public/CNAME
public/apparitions/README.md
src/lib/siteConfig.ts             loadSiteConfig (Task 1)
src/lib/shows.ts                  upcomingShows (Task 2)
src/lib/apparitions.ts            classify/build/pick (Task 4)
src/content.config.ts             band, shows, software collections (Task 2)
src/content/band/*.md             about, origin, sound, vision (+README)
src/content/shows/*.md            one example (+README)
src/content/software/*.md         deckard (+README)
src/styles/band.css               CRT / mono theme (Task 3)
src/styles/software.css           calm theme (Task 7)
src/layouts/BandLayout.astro      (Task 3)
src/layouts/SoftwareLayout.astro  (Task 7)
src/components/Nav.astro          (Task 3)
src/components/ShowList.astro     (Task 3)
src/components/Intro.astro        markup + embedded JSON (Task 5)
src/scripts/intro.ts              client intro controller (Task 5)
src/components/BookingForm.astro  (Task 6)
src/scripts/booking.ts            progressive-enhancement submit (Task 6)
src/pages/index.astro             intro + band sections + shows summary + booking CTA
src/pages/shows.astro
src/pages/booking.astro
src/pages/software/index.astro
src/pages/software/deckard.astro
src/pages/404.astro
tests/unit/*.test.ts
tests/e2e/*.spec.ts
tests/fixtures/                   test apparition PNG/WebM
.github/workflows/deploy.yml      (Task 8)
```

---

### Task 1: Project scaffold and site settings loader

**Files:**
- Create: `mise.toml`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.gitignore`, `site.config.yaml`, `src/lib/siteConfig.ts`, `src/pages/index.astro` (temporary "PANIC SIGNALS" stub)
- Test: `tests/unit/siteConfig.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface LinkedVideo { url: string; poster?: string }
  export interface SiteConfig {
    formspreeEndpoint: string;            // must start with https://formspree.io/f/
    timezone: string;                     // IANA, default "America/New_York"
    apparitions: { pinned?: string; videos: LinkedVideo[] };
    social: { label: string; url: string }[];
  }
  export function parseSiteConfig(raw: unknown): SiteConfig;   // throws Error naming the bad field
  export function loadSiteConfig(path?: string): SiteConfig;   // reads ./site.config.yaml (Node fs + yaml)
  ```

- [ ] **Step 0: mise owns the toolchain and the commands.** `mise.toml` pins `node = "24"` and defines the tasks the owner uses. All later steps run through these tasks rather than bare `npm`:
  ```toml
  [tools]
  node = "24"

  [tasks.setup]   # run = "npm ci"
  [tasks.dev]     # run = "npm run dev"
  [tasks.build]   # run = "npm run build"
  [tasks.preview] # depends = ["build"], run = "npm run preview"
  [tasks.test]    # run = "npm test"
  [tasks.e2e]     # run = "npx playwright install --with-deps chromium webkit && npm run e2e"
  [tasks.deploy]  # depends = ["test", "build"]; run = "git push origin main"
                  # (GitHub Actions builds and publishes on push)
  [tasks.deploy-status] # run = "gh run watch --exit-status $(gh run list -w deploy.yml -L1 --json databaseId -q '.[0].databaseId')"
  ```
  Each task gets a `description`. `deploy` refuses to run with a dirty working tree (`git diff --quiet && git diff --cached --quiet || { echo "commit first"; exit 1; }`).
- [ ] **Step 1: Initialize repo and toolchain.** Run `git init -b main`, `git remote add origin git@github.com:Panic-Signals/panic-signals-site.git`, `mise trust && mise install`, `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`, then `npm i -D vitest @playwright/test yaml` and `npm i`. Set `site: 'https://panicsignals.tv'` in `astro.config.mjs`. Write `.gitignore` per File Structure.
- [ ] **Step 2: Write `site.config.yaml`** with comments explaining each key:
  ```yaml
  formspreeEndpoint: https://formspree.io/f/REPLACE_ME
  timezone: America/New_York
  apparitions:
    pinned:            # optional: a filename in public/apparitions/ or one of the video URLs below
    videos: []         # - url: https://cdn.example.com/hand.webm
                       #   poster: https://cdn.example.com/hand.png
  social: []
  ```
- [ ] **Step 3: Write failing tests** in `tests/unit/siteConfig.test.ts`:
  - `parses the committed site.config.yaml` → `loadSiteConfig().timezone === 'America/New_York'`, `apparitions.videos` deep-equals `[]`
  - `defaults missing timezone/apparitions/social` → `parseSiteConfig({formspreeEndpoint:'https://formspree.io/f/abc'})` returns `timezone:'America/New_York'`, `apparitions:{videos:[]}`, `social:[]`
  - `rejects non-formspree endpoint` → throws `/formspreeEndpoint/`
  - `rejects YouTube/Vimeo video urls` → `videos:[{url:'https://youtu.be/x'}]` throws `/direct video file/`; same for `https://www.youtube.com/watch?v=x` and `https://vimeo.com/1`
  - `rejects video url without .mp4/.webm/.mov path` → `https://cdn.x/clip` throws `/direct video file/`; accepts `https://cdn.x/clip.webm?v=2`
  - `treats empty pinned as undefined` → YAML null yields `pinned === undefined`
- [ ] **Step 4: Run** `npx vitest run tests/unit/siteConfig.test.ts`. Expected: FAIL (module not found).
- [ ] **Step 5: Implement `src/lib/siteConfig.ts`.** Do the validation by hand, with no zod dependency. Video URL check: parse with `URL`, reject hosts matching `youtube.com|youtu.be|vimeo.com`, require the pathname to end in `.mp4|.webm|.mov` (case-insensitive).
- [ ] **Step 6: Run** `npm test && npm run build`. Expected: tests PASS and the build emits `dist/index.html`.
- [ ] **Step 7: Commit** `git add -A && git commit -m "chore: scaffold Astro site with validated site.config.yaml"`

---

### Task 2: Content collections, placeholder content and show filtering

**Files:**
- Create: `src/content.config.ts`, `src/lib/shows.ts`, `src/content/band/{about,origin,sound,vision}.md`, `src/content/band/README.md`, `src/content/shows/2026-12-12-example-venue.md`, `src/content/shows/README.md`, `src/content/software/deckard.md`, `src/content/software/README.md`
- Test: `tests/unit/shows.test.ts`

**Interfaces:**
- Consumes: `SiteConfig.timezone` (Task 1)
- Produces:
  - Collections (glob loader over `src/content/<name>/*.md`, excluding `README.md`):
    - `band`: `{ title: string; order: number }` with body Markdown
    - `shows`: `{ date: string /* YYYY-MM-DD, validated by regex and real-date check */; city: string; venue: string; tickets?: string /* url */; doors?: string }` with optional body notes
    - `software`: `{ title: string; summary: string; repo: string /* url */; status: string; order: number }` with body
  - `export interface ShowLike { date: string }`
  - `export function todayIn(timezone: string, now?: Date): string` returns `YYYY-MM-DD`
  - `export function upcomingShows<T extends ShowLike>(shows: T[], timezone: string, now?: Date): T[]` keeps shows with `date >= todayIn(...)`, sorted ascending by date

- [ ] **Step 1: Write failing tests** in `tests/unit/shows.test.ts`:
  - `todayIn uses the site timezone` → `todayIn('America/New_York', new Date('2026-12-13T03:00:00Z')) === '2026-12-12'`
  - `keeps a show dated today` → a show on `2026-12-12` at that same `now` is kept
  - `drops yesterday's show` → `2026-12-11` is dropped
  - `sorts ascending` → input `[2027-01-05, 2026-12-20]` returns `[2026-12-20, 2027-01-05]`
  - `empty input returns empty array`
- [ ] **Step 2: Run** `npx vitest run tests/unit/shows.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement `src/lib/shows.ts`** using `Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric', month:'2-digit', day:'2-digit' })` for `todayIn`.
- [ ] **Step 4: Write `src/content.config.ts`** with the schemas above. The show `date` refine fails with the message `date must be YYYY-MM-DD (e.g. 2026-12-12)`. Use the schema helper Astro 7 documents (`astro/zod`).
- [ ] **Step 5: Write the content.** Band files are `title` plus `order` 1–4 (About / Where We're From / Our Sound / Vision) with two paragraphs of lorem ipsum each. The example show is `2026-12-12`, `City, ST`, `Example Venue`, with a placeholder tickets URL. `deckard.md` has `title: DECKARD`, a summary paraphrasing the README's first paragraph, `repo: https://github.com/Panic-Signals/Deckard`, `status: Manual coming soon` and `order: 1`. Each README explains the front matter fields with a copy-paste example. The shows README notes that past shows disappear automatically after the nightly rebuild.
- [ ] **Step 6: Verify a bad date fails the build.** Temporarily add `date: 12/12/2026` to a scratch show and run `npm run build`. Expected: the build fails with a message containing `YYYY-MM-DD`. Delete the scratch file.
- [ ] **Step 7: Run** `npm test && npm run build`. Expected: PASS.
- [ ] **Step 8: Commit** `git commit -am "feat: content collections, placeholder band/show/software content, show filtering"` (stage the new files first)

---

### Task 3: Band theme, layout, home sections and shows page

**Files:**
- Create: `src/styles/band.css`, `src/layouts/BandLayout.astro`, `src/components/Nav.astro`, `src/components/ShowList.astro`, `src/pages/shows.astro`, `playwright.config.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/band.spec.ts`

**Interfaces:**
- Consumes: `band`/`shows` collections, `upcomingShows`, `todayIn`, `loadSiteConfig` (Tasks 1–2)
- Produces:
  - `BandLayout` props `{ title: string; description?: string }`, with `<slot />` inside `<main id="content">`
  - `Nav` links: Home `/`, Shows `/shows`, Booking `/booking`, Software `/software`
  - `ShowList` props `{ shows: CollectionEntry<'shows'>[]; limit?: number }`. Each show renders as `<li data-show-date="YYYY-MM-DD">` with the date, venue, city and an optional tickets link. Empty state: `<p data-empty-shows>` "No shows announced yet." plus a link to `/booking`.
  - Home page band sections: `<section id="<entry id>" data-band-section>` with an `<h2>` title, ordered by `order`

- [ ] **Step 1: Write `playwright.config.ts`.** Use Chromium and WebKit projects, `baseURL: 'http://localhost:4321'`, and `webServer.command: 'npm run build && npm run preview -- --port 4321'`. Add the `e2e` script.
- [ ] **Step 2: Write failing tests** in `tests/e2e/band.spec.ts`. Seed `sessionStorage['ps-intro-seen']='1'` via `addInitScript` so the intro doesn't interfere.
  - `home renders the four band sections in order` → `[data-band-section] h2` texts equal `['About', "Where We're From", 'Our Sound', 'Vision']`
  - `band pages use the monospace font` → computed `font-family` of `body` contains `Courier`
  - `shows page lists the example show` → `[data-show-date="2026-12-12"]` is visible
  - `home shows summary links to /shows and /booking`
  - `nav has Home, Shows, Booking, Software`
- [ ] **Step 3: Run** `npx playwright test tests/e2e/band.spec.ts`. Expected: FAIL.
- [ ] **Step 4: Implement `band.css`, `BandLayout`, `Nav`, `ShowList`, `shows.astro` and the home sections.** The CRT look is applied site-wide on band pages: near-black background, faint scan-line overlay (`body::after`, `pointer-events:none`), red/cyan `text-shadow` split on headings, and a subtle vignette. Use the mockups in `.superpowers/brainstorm/*/content/intro-directions*.html` and `static-somethings.html` as the visual reference. Wrap the scan-line and glitch-flicker animations in `@media (prefers-reduced-motion: no-preference)`.
- [ ] **Step 5: Add the empty-state test.** `empty state when no upcoming shows` renders `ShowList` with `[]` in a tiny test-only page, or asserts via a unit test on `upcomingShows` plus an Astro container render (`experimental_AstroContainer`). Expected: the `[data-empty-shows]` text plus a `/booking` link.
- [ ] **Step 6: Run** `npm run e2e -- tests/e2e/band.spec.ts`. Expected: PASS in both browsers.
- [ ] **Step 7: Commit** `git commit -m "feat: band theme, home sections, shows page"`

---

### Task 4: Apparition pool (images, local videos, linked videos)

**Files:**
- Create: `src/lib/apparitions.ts`, `public/apparitions/README.md`
- Test: `tests/unit/apparitions.test.ts`

**Interfaces:**
- Consumes: `SiteConfig.apparitions` (Task 1)
- Produces:
  ```ts
  export type Apparition =
    | { kind: 'image'; src: string }
    | { kind: 'video'; src: string; poster?: string };
  export function classifyFile(filename: string): 'image' | 'video' | null;   // by extension, case-insensitive
  export function buildApparitionPool(files: string[], cfg: SiteConfig['apparitions']): Apparition[];
  //   files are bare filenames from public/apparitions; src becomes `/apparitions/<encodeURIComponent(name)>`
  //   local video poster: same basename with .png/.webp/.gif if present in files
  //   README.md, dotfiles and unknown extensions are ignored
  export function pickApparition(pool: Apparition[], opts: { pinned?: string; preferStill: boolean; random: () => number }): Apparition | null;
  //   pinned matches a local filename or a linked video URL; unknown pinned → random pick (no throw)
  //   preferStill: a video becomes { kind:'image', src: poster } if it has a poster; otherwise prefer a random image; if the pool has only poster-less videos, return null
  export function readApparitionDir(dir?: string): string[];   // fs.readdirSync('public/apparitions'), [] if missing
  ```

- [ ] **Step 1: Write failing tests:**
  - `classifyFile`: `hand.PNG`→image, `x.webp`→image, `x.gif`→image, `x.webm`/`x.mp4`/`x.mov`→video, `README.md`→null, `.DS_Store`→null
  - `buildApparitionPool(['hand.png','ghost.webm','ghost.png','README.md'], {videos:[{url:'https://cdn.x/a.mp4'}]})` deep-equals images `hand.png`, `ghost.png`, video `/apparitions/ghost.webm` with poster `/apparitions/ghost.png`, and the linked video `https://cdn.x/a.mp4`
  - filename with a space → `src` `/apparitions/my%20hand.png`
  - `pickApparition` with `pinned:'ghost.webm'` returns that video regardless of `random`
  - `pickApparition` with `pinned:'missing.png'` falls back to `pool[Math.floor(random()*pool.length)]`
  - `pickApparition` with `preferStill:true` on a video with poster returns `{kind:'image', src: poster}`
  - `pickApparition([], …)` returns `null`; a pool of a single poster-less video with `preferStill:true` returns `null`
- [ ] **Step 2: Run** `npx vitest run tests/unit/apparitions.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement `src/lib/apparitions.ts`.** This module must stay free of Node imports except `readApparitionDir`, which goes in the same file behind a lazy `import('node:fs')`. Alternatively, split it into `apparitionsFs.ts` so `pickApparition` can be bundled for the client.
- [ ] **Step 4: Write `public/apparitions/README.md`.** Cover the supported formats, the transparent-PNG tip, WebM-with-alpha plus HEVC `.mov` for Safari, the poster naming convention (`name.webm` + `name.png`), how to link hosted videos in `site.config.yaml`, how to pin one, and that YouTube/Vimeo links don't work.
- [ ] **Step 5: Run** `npm test`. Expected: PASS.
- [ ] **Step 6: Commit** `git commit -m "feat: apparition pool from folder and linked videos"`

---

### Task 5: The CRT intro

**Files:**
- Create: `src/components/Intro.astro`, `src/scripts/intro.ts`, `tests/fixtures/apparition.png` (small transparent PNG), `tests/fixtures/apparition.webm` (≤50 KB, 2s)
- Modify: `src/pages/index.astro` (include `<Intro />` before the band sections)
- Test: `tests/e2e/intro.spec.ts`

**Interfaces:**
- Consumes: `buildApparitionPool`, `readApparitionDir`, `pickApparition`, `loadSiteConfig` (Tasks 1, 4)
- Produces:
  - `Intro.astro` renders only `<script type="application/json" id="intro-data">{ pool: Apparition[], pinned?: string }</script>` and a module script importing `src/scripts/intro.ts`. It renders **no** overlay markup in HTML.
  - The overlay that `intro.ts` creates: `<div id="intro" role="presentation" aria-hidden="true">` containing a `<canvas>` (static), an optional `<img data-apparition>` / `<video data-apparition muted playsinline>`, a flash layer, the wordmark `PANIC SIGNALS`, and `<button data-intro-skip>Skip</button>` (the button is not aria-hidden: put it outside the hidden subtree or give it its own focusable container).
  - On finish or skip: remove `#intro`, set `sessionStorage['ps-intro-seen']='1'`, focus `#content`, and dispatch `document` event `ps:intro-done`.
  - `data-intro-state` on `<html>`: `playing` → `done`.

- [ ] **Step 1: Write failing tests** in `tests/e2e/intro.spec.ts`. Tests needing specific apparitions intercept `/apparitions/*` with `page.route` and override `#intro-data` contents via `addInitScript` (patch on `DOMContentLoaded` before `intro.ts` reads it). Alternatively, have `intro.ts` read `window.__PS_INTRO_OVERRIDE__` when present: document it as test-only.
  - `plays on first visit then ends on the wordmark` → `#intro` visible; within 9s `html[data-intro-state="done"]`, `#intro` gone, `#content` focused
  - `does not replay in the same session` → reload; `#intro` never attached (`expect(page.locator('#intro')).toHaveCount(0)` after 500 ms)
  - `skip button ends it immediately` → click `[data-intro-skip]`; state `done` within 500 ms
  - `any key skips` → press `Escape`; state `done`
  - `no apparition` → pool `[]`: intro completes, and no request to `/apparitions/` is made
  - `video fails` → pool has one linked video whose route returns 404; intro still reaches `done` within 9s
  - `video stalls` → the route never responds; intro reaches `done` within 9s (the 4000 ms `canplay` timeout)
  - `reduced motion` → `page.emulateMedia({reducedMotion:'reduce'})`: no element with `[data-flash]` gets opacity > 0 (poll during the run), no `<video>` is created, and it reaches `done` within 2s
  - `no js` → new context with `javaScriptEnabled:false`: `#intro` absent, all `[data-band-section]` visible
  - `mobile autoplay attrs` → when a video apparition is used, it has `muted`, `playsinline` and `autoplay` properties set
- [ ] **Step 2: Run** `npx playwright test tests/e2e/intro.spec.ts`. Expected: FAIL.
- [ ] **Step 3: Implement `intro.ts`.**
  - **Timeline**, ~7s total, from the chosen mockup C: 0–1.5s static only; 1.5–4.5s apparition fades in blurred and grows; 4.5–5.2s tremble; ~5.2s white flash; 5.4–7s wordmark with RGB split, flicker once, then fade the overlay out.
  - **Static:** canvas noise at low internal resolution (e.g. 160×100) scaled with `image-rendering: pixelated`, using `requestAnimationFrame`, cancelled on finish.
  - **`preferStill`** = reduced motion OR `navigator.connection?.saveData === true`.
  - **Video:** muted, `playsInline` and `autoplay` set as properties before `src`. Wait for `canplay` or 4000 ms or `error`; on failure, drop the apparition and continue the timeline.
  - **Reduced motion:** static frame drawn once (no loop), a 1s fade to the wordmark, a short hold, then done.
  - **Listeners:** Skip on `keydown`, `pointerdown`, `wheel` and `touchstart` (passive), all removed on finish.
  - **Page behind the intro:** while playing, `<html data-intro-state="playing">` sets `overflow:hidden` on the body. The overlay is `position:fixed; inset:0; z-index:100`.
- [ ] **Step 4: Implement `Intro.astro`.** At build time it calls `readApparitionDir()`, `buildApparitionPool(...)` and `loadSiteConfig()`, then embeds the JSON. Add an inline `<script is:inline>` in `BandLayout`'s `<head>` that exits early when `sessionStorage['ps-intro-seen']==='1'` by setting `data-intro-state="done"` before paint, so there's no flash of the intro on return visits.
- [ ] **Step 5: Run** `npm run e2e -- tests/e2e/intro.spec.ts`. Expected: PASS in Chromium and WebKit.
- [ ] **Step 6: Manual check.** `npm run dev`, then drop `tests/fixtures/apparition.png` into `public/apparitions/`. Watch the intro on desktop and in a mobile emulation viewport and confirm it reads like mockup C. Then remove the fixture from `public/apparitions/`.
- [ ] **Step 7: Commit** `git commit -m "feat: CRT intro with image/video apparitions, skip, session and reduced-motion handling"`

---

### Task 6: Booking form (Formspree)

**Files:**
- Create: `src/components/BookingForm.astro`, `src/scripts/booking.ts`, `src/pages/booking.astro`
- Test: `tests/e2e/booking.spec.ts`

**Interfaces:**
- Consumes: `loadSiteConfig().formspreeEndpoint`, `BandLayout`
- Produces: `<form data-booking action="{formspreeEndpoint}" method="POST">` with these fields:
  - `name` (required)
  - `email` (type=email, required)
  - `event` (Venue / event, required)
  - `city` (required)
  - `date` (type=date, optional)
  - `message` (textarea, required)
  - hidden honeypot `_gotcha` (visually hidden, `tabindex="-1"`, `autocomplete="off"`)
  - hidden `_subject` = `Booking request — panicsignals.tv`

  Status region: `<p data-booking-status role="status" aria-live="polite">`.

- [ ] **Step 1: Write failing tests.** Use `page.route('https://formspree.io/**', …)`.
  - `required fields block submit` → submit empty; no request made; `name` is `:invalid`
  - `successful submit` → route returns 200 `{ok:true}`; status text contains `Thanks`; form is reset; the request body contains `email` and `_gotcha` (empty) and was sent with `Accept: application/json`
  - `error keeps input` → route returns 422 `{errors:[{message:'bad'}]}`; status contains `couldn't send`; the `message` field still holds the typed text; submit button enabled
  - `network failure keeps input` → `route.abort()`; same expectations as the error test
  - `submit disabled while sending` → delay the route by 1s; the button is disabled with text `Sending…` during the wait
  - `works without JS` → JS disabled: the form's `action` equals the configured endpoint and `method` is `post`
- [ ] **Step 2: Run** these tests. Expected: FAIL.
- [ ] **Step 3: Implement.** `booking.ts` intercepts `submit`, posts `new FormData(form)` with `fetch(form.action, {method:'POST', body, headers:{Accept:'application/json'}})` and handles the states above. On success the copy is "Thanks — we'll get back to you." and on failure "Sorry, that couldn't send. Please try again or email us directly." The form uses the band mono theme.
- [ ] **Step 4: Add a "Book us" call-to-action** on the home page and the shows page that links to `/booking`.
- [ ] **Step 5: Run** `npm run e2e -- tests/e2e/booking.spec.ts`. Expected: PASS.
- [ ] **Step 6: Commit** `git commit -m "feat: Formspree booking form with progressive enhancement"`

---

### Task 7: Software section and Deckard placeholder

**Files:**
- Create: `src/styles/software.css`, `src/layouts/SoftwareLayout.astro`, `src/pages/software/index.astro`, `src/pages/software/deckard.astro`
- Test: `tests/e2e/software.spec.ts`

**Interfaces:**
- Consumes: `software` collection, `Nav`
- Produces:
  - `SoftwareLayout` props `{ title: string; description?: string }`, using the same `Nav` with the monospace wordmark. It has no scan lines, flicker or glitch.
  - `/software` lists entries sorted by `order` as `<article data-project="<id>">` with a title link, summary and status.
  - `/software/deckard` renders the `deckard.md` body, links to `https://github.com/Panic-Signals/Deckard` and `https://github.com/Panic-Signals/Deckard/releases`, and shows a "Manual coming soon" notice.

- [ ] **Step 1: Write failing tests:**
  - `software list shows DECKARD` → `[data-project="deckard"]` contains `DECKARD` and links to `/software/deckard`
  - `deckard page links to repo and releases` → anchors with those two exact hrefs
  - `deckard page says manual coming soon`
  - `software pages are not monospace` → the computed `font-family` of `main p` does not contain `Courier`; the wordmark does
  - `software pages have no scanline overlay` → computed `content` of `body::after` is `none` or empty
- [ ] **Step 2: Run** the tests. Expected: FAIL.
- [ ] **Step 3: Implement** the layout, styles and pages. Use the same palette as the band pages, high-contrast body text, and a max line length of ~70ch.
- [ ] **Step 4: Run** `npm run e2e -- tests/e2e/software.spec.ts`. Expected: PASS.
- [ ] **Step 5: Commit** `git commit -m "feat: software section with Deckard placeholder"`

---

### Task 8: 404, deploy workflow, domain and owner docs

**Files:**
- Create: `src/pages/404.astro`, `.github/workflows/deploy.yml`, `public/CNAME`, `README.md`
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: everything above

- [ ] **Step 1: Write a failing smoke test.** It visits `/`, `/shows`, `/booking`, `/software`, `/software/deckard` and `/nope`. The first five return 200 and `/nope` serves the 404 page containing `NO SIGNAL`. No page logs a console error. Every internal `<a href^="/">` on those pages resolves to a non-404.
- [ ] **Step 2: Run** it. Expected: FAIL (no 404 page).
- [ ] **Step 3: Implement `404.astro`** with `BandLayout`, a static "NO SIGNAL" test-card and a link home. Write `public/CNAME` = `panicsignals.tv`.
- [ ] **Step 4: Write `.github/workflows/deploy.yml`.**
  - **Triggers:** `push` to `main`, `schedule: cron '17 9 * * *'` (nightly, so past shows drop off) and `workflow_dispatch`.
  - **Permissions:** `contents: read`, `pages: write`, `id-token: write`.
  - **Concurrency:** group `pages`.
  - **Jobs:** a build job that sets up Node 24, runs `npm ci`, `npm test` and `npm run build`, then uploads `dist` with `actions/upload-pages-artifact`, followed by a deploy job using `actions/deploy-pages`.
  - The e2e tests aren't run in CI; Vitest is.
- [ ] **Step 5: Write `README.md` for the owner:**
  - how to edit band text, add a show, add an apparition (image, video or linked video) and pin one
  - how to set the Formspree endpoint: create a form at formspree.io, paste `https://formspree.io/f/<id>` into `site.config.yaml`, and add `panicsignals.tv` as an allowed domain in Formspree
  - GitHub Pages setup: Settings → Pages → Source "GitHub Actions"; custom domain `panicsignals.tv`; Enforce HTTPS
  - DNS at the registrar: apex `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `AAAA` records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`; `www` CNAME to `<owner>.github.io`
  - local dev and deploy: `mise install && mise run setup && mise run dev`; publish with `mise run deploy`
- [ ] **Step 6: Run** `npm test && npm run e2e`. Expected: all PASS. Validate the workflow with `npx --yes action-validator .github/workflows/deploy.yml`, or by eye if it's unavailable.
- [ ] **Step 7: Commit** `git commit -m "feat: 404 page, Pages deploy workflow, CNAME and owner README"`
- [ ] **Step 8: First deploy.**
  1. Enable Pages with the Actions source: `gh api -X POST repos/Panic-Signals/panic-signals-site/pages -f build_type=workflow`.
  2. Run `mise run deploy`, then `mise run deploy-status`. Expected: the workflow succeeds.
  3. Set the custom domain: `gh api -X PUT repos/Panic-Signals/panic-signals-site/pages -f cname=panicsignals.tv`.
  4. Expected: the site is reachable at the Pages URL now, and at `https://panicsignals.tv` once the owner adds the DNS records from the README. Enforce HTTPS after DNS resolves and the certificate is issued.
  5. Recommend the owner verify `panicsignals.tv` for the Panic-Signals org (Org Settings → Pages → Verified domains) to prevent domain takeover.
