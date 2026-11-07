// Draws the DECKARD manual's controller diagrams as SVG line drawings into
// public/manual/diagrams/. Run it after changing a layout here:
//
//   node scripts/manual-diagrams.mjs
//
// The drawings are simplified (not to scale). Cyan marks what DECKARD adds or changes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'manual', 'diagrams');

const C = {
  line: '#6f6f7c',
  faint: '#3a3a44',
  text: '#d6d6de',
  dim: '#8c8c98',
  hi: '#00e5ff',
  hiFill: 'rgba(0,229,255,0.12)',
  body: '#121218',
  screen: '#07070a',
  red: '#ff1f4b',
};
const FONT = `font-family="Menlo, 'IBM Plex Mono', Consolas, monospace"`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(x, y, s, { size = 10, fill = C.text, anchor = 'middle', weight = 400 } = {}) {
  return `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="middle">${esc(s)}</text>`;
}

function rect(x, y, w, h, { r = 3, stroke = C.line, fill = 'none', sw = 1.2, dash = '' } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

// A labelled button. `hi`: DECKARD adds or changes it. `lines`: a two-line label.
function button(x, y, w, h, label, { hi = false, size = 10.5, sub = '' } = {}) {
  const out = [rect(x, y, w, h, { stroke: hi ? C.hi : C.line, fill: hi ? C.hiFill : 'none', sw: hi ? 1.6 : 1.2 })];
  const lines = String(label).split('\n');
  const cy = y + h / 2 - (lines.length - 1) * (size * 0.6);
  lines.forEach((l, i) => out.push(text(x + w / 2, cy + i * size * 1.2, l, { size, fill: hi ? C.hi : C.text })));
  if (sub) out.push(text(x + w / 2, y + h + 8, sub, { size: 7.5, fill: C.dim }));
  return out.join('');
}

function knob(cx, cy, r, { hi = false } = {}) {
  const stroke = hi ? C.hi : C.line;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${hi ? 1.6 : 1.2}"/><line x1="${cx}" y1="${cy - r + 3}" x2="${cx}" y2="${cy - r / 2.5}" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round"/>`;
}

// A numbered callout badge.
function badge(cx, cy, n) {
  return `<circle cx="${cx}" cy="${cy}" r="8" fill="${C.hi}"/>${text(cx, cy + 0.5, n, { size: 9, fill: '#000', weight: 700 })}`;
}

function svg(w, h, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${body}</svg>\n`;
}

// ---------------------------------------------------------------------------------
// Maschine MK3: the whole controller.

function mk3Overview() {
  const W = 1000;
  const H = 770;
  const o = [];
  o.push(rect(10, 10, W - 20, H - 20, { r: 18, fill: C.body, sw: 1.5 }));

  // Upper left: the mode and navigation buttons.
  const left = [
    ['CHANNEL', 'PLUG-IN'],
    ['ARRANGER', 'MIXER'],
    ['BROWSER', 'SAMPLING'],
    ['◀', '▶'],
    ['FILE', 'SETTINGS'],
    ['AUTO', 'MACRO'],
  ];
  left.forEach((row, i) =>
    row.forEach((l, j) => o.push(button(34 + j * 74, 44 + i * 38, 66, 26, l, { hi: l === 'AUTO' }))),
  );
  o.push(badge(34 + 66, 44 + 5 * 38, 5));

  // Display buttons, the two screens, the knobs (across the rest of the top).
  const sx = 200;
  const slot = 96;
  for (let i = 0; i < 8; i++) {
    const x = sx + i * slot;
    o.push(rect(x + 14, 40, slot - 28, 14, { r: 2 }));
    o.push(text(x + slot / 2, 31, i + 1, { size: 9.5, fill: C.dim }));
    o.push(knob(x + slot / 2, 218, 17));
    o.push(text(x + slot / 2, 246, i + 1, { size: 9.5, fill: C.dim }));
  }
  const sw = (8 * slot) / 2 - 8;
  o.push(rect(sx + 4, 64, sw, 124, { r: 4, fill: C.screen, stroke: C.hi, sw: 1.6 }));
  o.push(rect(sx + 12 + sw, 64, sw, 124, { r: 4, fill: C.screen, stroke: C.hi, sw: 1.6 }));
  o.push(text(sx + 4 + sw / 2, 126, 'left screen', { size: 10, fill: C.dim }));
  o.push(text(sx + 12 + sw * 1.5, 126, 'right screen', { size: 10, fill: C.dim }));
  o.push(badge(sx + 12 + 2 * sw, 64, 7));

  // Lower left, top: the 4-D encoder, then a column of VOLUME, SWING and TEMPO, then
  // NOTE REPEAT (two rows high) over LOCK.
  o.push(`<circle cx="76" cy="334" r="40" fill="none" stroke="${C.line}" stroke-width="1.2"/>`);
  o.push(`<circle cx="76" cy="334" r="28" fill="none" stroke="${C.faint}" stroke-width="1"/>`);
  o.push(text(76, 388, '4-D encoder', { size: 9.5, fill: C.dim }));
  ['VOLUME', 'SWING', 'TEMPO'].forEach((l, i) => o.push(button(132, 292 + i * 34, 72, 28, l, { size: 10.5 })));
  o.push(button(212, 292, 72, 62, 'NOTE\nREPEAT', { size: 10.5 }));
  o.push(button(212, 360, 72, 28, 'LOCK', { size: 10.5 }));

  // Lower left: Smart Strip, groups, transport.
  ['PITCH', 'MOD', 'PERFORM', 'NOTES'].forEach((l, i) => o.push(button(34 + i * 64, 410, 58, 22, l, { size: 10.5 })));
  o.push(rect(34, 442, 250, 22, { r: 11 }));
  o.push(text(159, 453, 'Smart Strip', { size: 9, fill: C.dim }));
  'ABCDEFGH'.split('').forEach((l, i) =>
    o.push(button(34 + (i % 4) * 64, 492 + Math.floor(i / 4) * 40, 58, 32, l, { size: 11 })),
  );
  o.push(text(159, 481, 'groups', { size: 10.5, fill: C.dim }));
  const transport = [
    ['RESTART', 'ERASE', 'TAP', 'FOLLOW'],
    ['PLAY', 'REC', 'STOP', 'SHIFT'],
  ];
  transport.forEach((row, i) =>
    row.forEach((l, j) => o.push(button(34 + j * 64, 600 + i * 40, 58, 30, l, { size: 10.5, hi: l === 'SHIFT' }))),
  );
  o.push(badge(34 + 3 * 64 + 58, 640, 1));
  o.push(text(159, 589, 'transport', { size: 10.5, fill: C.dim }));

  // One column just left of the pads, top to bottom.
  ['SCENE', 'PATTERN', 'EVENTS', 'VARIATION', 'DUPLICATE', 'SELECT', 'SOLO', 'MUTE'].forEach((l, i) =>
    o.push(button(458, 346 + i * 47, 84, 37, l, { size: 10.5, hi: l === 'SELECT' || l === 'SOLO' })),
  );
  o.push(badge(458 + 84, 346 + 5 * 47, 2));
  o.push(badge(458 + 84, 346 + 6 * 47, 3));

  // Lower right: pad modes and the pads.
  const px = 560;
  // FIXED VEL over the column; PAD MODE, KEYBOARD, CHORDS and STEP over the pads' columns.
  o.push(button(458, 300, 84, 28, 'FIXED VEL', { size: 10.5 }));
  ['PAD MODE', 'KEYBOARD', 'CHORDS', 'STEP'].forEach((l, i) =>
    o.push(button(px + i * 95, 300, 85, 28, l, { size: 10.5, hi: l === 'STEP' || l === 'KEYBOARD' })),
  );
  o.push(badge(px + 95 + 85, 300, 6));
  o.push(badge(px + 3 * 95 + 85, 300, 4));
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const n = (3 - row) * 4 + col + 1;
      const x = px + col * 95;
      const y = 346 + row * 95;
      o.push(rect(x, y, 85, 85, { r: 6 }));
      o.push(text(x + 10, y + 12, n, { size: 9, fill: C.dim, anchor: 'start' }));
    }
  }
  o.push(text(px + 185, 735, 'pads 1–16 (pad 1 bottom left)', { size: 10.5, fill: C.dim }));

  return svg(W, H, 'Maschine MK3 layout, with the controls DECKARD adds to or changes marked 1 to 7', o.join(''));
}

// A close-up of the display area: eight buttons, two screens, eight knobs.
// `screens(o, sx)` draws the screens' contents.
function displayArea({ title, buttons, knobs, screens, note }) {
  const W = 1000;
  const H = note ? 380 : 350;
  const sx = 60;
  const o = [rect(10, 10, W - 20, H - 20, { r: 14, fill: C.body, sw: 1.5 })];
  for (let i = 0; i < 8; i++) {
    const x = sx + i * 110;
    const b = buttons[i] ?? { label: '' };
    o.push(text(x + 55, 30, i + 1, { size: 9.5, fill: C.dim }));
    o.push(button(x + 10, 40, 90, 26, b.label, { hi: b.hi, size: 9 }));
    const k = knobs[i] ?? { label: '' };
    o.push(knob(x + 55, 292, 18, { hi: Boolean(k.label) && k.hi !== false }));
    o.push(text(x + 55, 324, k.label, { size: 9, fill: k.label ? C.text : C.dim }));
  }
  o.push(rect(sx + 4, 82, 432, 176, { r: 4, fill: C.screen }));
  o.push(rect(sx + 444, 82, 432, 176, { r: 4, fill: C.screen }));
  screens(o, sx);
  if (note) o.push(text(W / 2, 354, note, { size: 9, fill: C.dim }));
  return svg(W, H, title, o.join(''));
}

function mk3Lfo() {
  return displayArea({
    title: 'The MK3 LFO page (SHIFT + SELECT): display buttons, screens and knobs',
    buttons: [
      { label: 'SINE', hi: true },
      { label: 'SQUARE', hi: true },
      { label: 'TRIANGLE', hi: true },
      { label: 'SAW', hi: true },
      { label: 'RANDOM', hi: true },
      { label: 'SYNC', hi: true },
      { label: 'ENV', hi: true },
      { label: 'TRIG', hi: true },
    ],
    knobs: ['SHAPE', 'RATE', 'PHASE', 'LEVEL', 'QUANTIZE', 'TRIGGER', 'FADE IN', ''].map((label) => ({ label })),
    note: 'In Envelope mode (ENV lit) knobs 1–4 are Attack, Decay, Sustain, Release, and button 6 is RETRIG.',
    screens(o, sx) {
      o.push(text(sx + 220, 150, 'LFO 1', { size: 40, weight: 700 }));
      o.push(text(sx + 220, 200, 'pads pick, add, mute and erase LFOs', { size: 9, fill: C.dim }));
      // A triangle wave stepped by Quantize.
      const x0 = sx + 474;
      const pts = [];
      for (let i = 0; i <= 32; i++) {
        const t = i / 32;
        const tri = 1 - Math.abs(((t * 2) % 1) * 2 - 1);
        const q = Math.round(tri * 4) / 4;
        pts.push(`${x0 + t * 372},${236 - q * 110}`);
        pts.push(`${x0 + (t + 1 / 32) * 372},${236 - q * 110}`);
      }
      pts.pop();
      o.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${C.hi}" stroke-width="2"/>`);
      o.push(text(x0, 100, 'TRIANGLE · 1/4 · trig', { size: 9, fill: C.dim, anchor: 'start' }));
    },
  });
}

function mk3ModMatrix() {
  const rows = ['SOURCE', 'GROUP', 'SOUND', 'MODULE', 'DEST', 'DEPTH'];
  const slots = [
    ['LFO 1', 'A Drums', '1 Kick', 'Filter', 'Cutoff', '20–80%'],
    ['Pressure', 'B Bass', '1 Sub', 'Replicant', 'Cutoff', '0–100%'],
    ['ENV 2', 'B Bass', '1 Sub', 'Sampler', 'Volume', '100–0%'],
    ['LFO 3', 'MIDI', 'Port 1', 'Ch 1', 'CC 74', '0–100%'],
    ['+ new', '', '', '', '', ''],
  ];
  return displayArea({
    title: 'The MK3 mod matrix page (SHIFT + SOLO): one route per column',
    buttons: Array.from({ length: 8 }, () => ({ label: 'next row ▼', hi: true })),
    knobs: Array.from({ length: 8 }, (_, i) => ({ label: `slot ${i + 1}` })),
    note: 'ERASE + a knob removes that column’s route. LEFT / RIGHT show the next eight.',
    screens(o, sx) {
      for (let col = 0; col < 8; col++) {
        const x = sx + 4 + (col < 4 ? 0 : 440) + (col % 4) * 108;
        const slot = slots[col];
        rows.forEach((r, i) => {
          const y = 100 + i * 26;
          if (col === 0 || col === 4) o.push(text(x + 4, y - 9, '', { size: 6 }));
          const on = slot && i === 5;
          if (on && slot[0] && slot[0] !== '+ new') o.push(rect(x + 4, y - 9, 100, 18, { r: 2, stroke: 'none', fill: C.hiFill }));
          if (slot) o.push(text(x + 54, y, slot[i] || (i === 0 && !slot[0] ? '' : ''), { size: 9, fill: on ? C.hi : C.text }));
        });
      }
      rows.forEach((r, i) => o.push(text(sx - 6, 100 + i * 26, r, { size: 7, fill: C.dim, anchor: 'end' })));
    },
  });
}

function mk3StepGrid() {
  return displayArea({
    title: 'The MK3 step grid (SHIFT + STEP): the display buttons are eight steps',
    buttons: Array.from({ length: 8 }, (_, i) => ({ label: `STEP ${i + 1}`, hi: true })),
    knobs: [
      { label: 'POSITION' },
      { label: 'PITCH' },
      { label: 'VELOCITY' },
      { label: 'LENGTH' },
      { label: 'ROOT' },
      { label: 'BANK/TYPE' },
      { label: 'TYPE/CHORD' },
      { label: 'RANGE' },
    ],
    note: 'Knobs 5–8 apply in Keyboard and Chords modes. LEFT / RIGHT move eight steps at a time.',
    screens(o, sx) {
      // Left: the piano roll's keys; right: eight steps with notes.
      for (let i = 0; i < 12; i++) {
        const y = 92 + i * 13.5;
        const black = [1, 3, 6, 8, 10].includes(i % 12);
        o.push(rect(sx + 14, y, 46, 12, { r: 1, fill: black ? '#2a2a32' : '#bfbfc8', stroke: 'none' }));
        o.push(`<line x1="${sx + 66}" y1="${y + 12.5}" x2="${sx + 426}" y2="${y + 12.5}" stroke="${C.faint}" stroke-width="0.6"/>`);
      }
      [
        [0, 3],
        [2, 5],
        [4, 7],
        [6, 5],
      ].forEach(([step, row]) => o.push(rect(sx + 70 + step * 44, 92 + row * 13.5, 40, 12, { r: 2, fill: C.hi, stroke: 'none' })));
      o.push(text(sx + 220, 252, 'piano roll, in the scale', { size: 9.5, fill: C.dim }));
      for (let i = 0; i < 8; i++) {
        const x = sx + 454 + i * 52;
        const on = [0, 2, 4, 6].includes(i);
        o.push(rect(x, 120, 44, 100, { r: 3, stroke: on ? C.hi : C.faint, fill: on ? C.hiFill : 'none' }));
        o.push(text(x + 22, 232, i + 1, { size: 9.5, fill: C.dim }));
      }
    },
  });
}

// ---------------------------------------------------------------------------------
// Launchpad Pro MK3.

const LP = { cell: 60, step: 68, x0: 112, y0: 112 };

function lpFrame(o, { hi = new Set(), labels = true }) {
  const { cell, step, x0, y0 } = LP;
  const side = (x, y, label, h = cell) => o.push(button(x, y, cell, h, labels ? label : '', { hi: hi.has(label), size: 9 }));
  side(x0 - step, y0 - step, 'Shift');
  ['◀', '▶', 'Session', 'Note', 'Chord', 'Custom', 'Sequencer', 'Projects'].forEach((l, i) =>
    side(x0 + i * step, y0 - step, l),
  );
  ['▲', '▼', 'Clear', 'Duplicate', 'Quantise', 'Fixed\nLength', 'Play', 'Record'].forEach((l, i) =>
    side(x0 - step, y0 + i * step, l),
  );
  for (let i = 0; i < 8; i++) {
    o.push(rect(x0 + 8 * step, y0 + i * step, cell, cell, { r: 4 }));
    o.push(text(x0 + 8 * step + cell / 2, y0 + i * step + cell / 2, '▸', { size: 12, fill: C.faint }));
  }
  const by = y0 + 8 * step;
  for (let i = 0; i < 8; i++) {
    o.push(button(x0 + i * step, by, cell, 30, labels ? `scene ${i + 1}` : '', { hi: hi.has('scenes'), size: 10.5 }));
  }
  ['Record\nArm', 'Mute', 'Solo', 'Volume', 'Pan', 'Sends', 'Device', 'Stop Clip'].forEach((l, i) =>
    o.push(button(x0 + i * step, by + 40, cell, 30, labels ? l : '', { hi: hi.has(l), size: 9.5 })),
  );
}

function lpOverview() {
  const W = 760;
  const H = 780;
  const o = [rect(14, 14, W - 28, H - 28, { r: 20, fill: C.body, sw: 1.5 })];
  const hi = new Set(['Shift', '◀', '▶', 'Session', '▲', '▼', 'Play', 'Record', 'Mute', 'scenes']);
  lpFrame(o, { hi });
  const { cell, step, x0, y0 } = LP;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      o.push(rect(x0 + c * step, y0 + r * step, cell, cell, { r: 6, stroke: r === 7 ? C.faint : C.line }));
    }
  }
  o.push(text(x0 + 4 * step - 4, y0 + 7 * step + cell / 2, 'playhead row', { size: 9, fill: C.dim }));
  return svg(W, H, 'Launchpad Pro MK3 layout, with the buttons DECKARD uses in Session mode marked', o.join(''));
}

function lpSession() {
  const W = 1060;
  const H = 780;
  const o = [rect(14, 14, 732, H - 28, { r: 20, fill: C.body, sw: 1.5 })];
  lpFrame(o, { hi: new Set(['scenes', 'Mute', 'Play', 'Record']), labels: true });
  const { cell, step, x0, y0 } = LP;
  const colours = ['#ff4d6d', '#ff9f1c', '#ffe066', '#7dffb0', '#00e5ff', '#5b8cff', '#b388ff', '#ff7eb6'];
  // patterns per group, and which plays in the focused scene (from 1; 0 = none).
  const groups = [
    [3, 2],
    [2, 1],
    [4, 4],
    [1, 1],
    [2, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  for (let c = 0; c < 8; c++) {
    const [n, playing] = groups[c];
    for (let r = 0; r < 7; r++) {
      const x = x0 + c * step;
      const y = y0 + r * step;
      const p = r + 1;
      if (p <= n) {
        const on = p === playing;
        o.push(rect(x, y, cell, cell, { r: 6, fill: colours[c], stroke: colours[c] }));
        if (!on) o.push(rect(x, y, cell, cell, { r: 6, fill: 'rgba(18,18,24,0.72)', stroke: 'none' }));
      } else if (p === n + 1 && c < 5) {
        o.push(rect(x, y, cell, cell, { r: 6, stroke: '#9a9aa6', dash: '3 3' }));
        o.push(text(x + cell / 2, y + cell / 2, '+', { size: 14, fill: C.dim }));
      } else {
        o.push(rect(x, y, cell, cell, { r: 6, stroke: C.faint }));
      }
    }
    // Playhead row: 3 of 8 played, pad 4 playing.
    const py = y0 + 7 * step;
    const fill = c < 3 ? 'rgba(255,255,255,0.25)' : c === 3 ? '#ffffff' : 'rgba(255,255,255,0.06)';
    o.push(rect(x0 + c * step, py, cell, cell, { r: 6, fill, stroke: C.line }));
  }
  // Numbered badges on the pads, explained on the right.
  const at = (c, r) => [x0 + c * step + cell - 2, y0 + r * step + 2];
  const marks = [
    [at(1, 0), 'Bright pad', ['the pattern this group plays', 'in the focused scene']],
    [at(0, 0), 'Dim pad', ['a pattern not in the scene;', 'press it to put it in']],
    [at(1, 2), 'Faint + pad', ['makes a new pattern after', 'the group’s last one']],
    [at(3, 7), 'Playhead row', ['the longest pattern in eighths:', 'dim played, white now, faint to come']],
    [[x0 + cell - 2, y0 + 8 * step + 2], 'Scene buttons', ['press to launch a scene; playing', 'pulses, queued flashes, faint = new']],
  ];
  const ax = 790;
  o.push(text(ax, y0 - 30, 'Columns are groups, rows are', { size: 11, anchor: 'start', weight: 700 }));
  o.push(text(ax, y0 - 14, 'their patterns, top row first.', { size: 11, anchor: 'start', weight: 700 }));
  marks.forEach(([[bx, by], title, body], i) => {
    o.push(badge(bx, by, i + 1));
    const ty = y0 + 40 + i * 92;
    o.push(badge(ax + 8, ty, i + 1));
    o.push(text(ax + 24, ty, title, { size: 11, anchor: 'start', weight: 700 }));
    body.forEach((b, j) => o.push(text(ax + 24, ty + 18 + j * 14, b, { size: 9.5, fill: C.dim, anchor: 'start' })));
  });
  return svg(W, H, 'Launchpad Pro MK3 Session mode in DECKARD: groups in columns, patterns in rows, scenes along the bottom', o.join(''));
}

mkdirSync(OUT, { recursive: true });
const files = {
  'mk3-overview.svg': mk3Overview(),
  'mk3-lfo-page.svg': mk3Lfo(),
  'mk3-mod-matrix-page.svg': mk3ModMatrix(),
  'mk3-step-grid.svg': mk3StepGrid(),
  'launchpad-overview.svg': lpOverview(),
  'launchpad-session.svg': lpSession(),
};
for (const [name, body] of Object.entries(files)) {
  writeFileSync(join(OUT, name), body);
  console.log(`wrote public/manual/diagrams/${name}`);
}
