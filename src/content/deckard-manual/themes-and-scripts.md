---
title: Themes and controller scripts
order: 11
description: Restyle the MK3's screens with a theme, and change what any button or page does with DECKARD's controller scripts.
---

## Themes for the MK3's screens

DECKARD draws the MK3's screens itself, so they can be restyled: colours, fonts and
text sizes, plus an optional animated border on the chosen button. Every page uses the
theme, so one file changes them all.

Choose one in **Preferences ▸ Hardware ▸ Controller theme**. DECKARD comes with four:

- **Maschine:** the look of Maschine's own screens.
- **Palenight:** lavender text and purple and cyan accents on black, so the screens
  blend into the MK3's bezel. A new install starts with it.
- **Palenight Blue Green:** the same colours on a deep blue-grey background.
- **Solarized Dark.**

> **Note:** Only in the next release: Palenight Blue Green, and Palenight's black
> background. Until then, Palenight is the deep blue-grey one.

<figure class="screenshot">
  <img src="/manual/screenshots/theme-maschine-lfo.png" alt="The LFO page on the MK3's screens in the Maschine theme." loading="lazy" />
  <figcaption>The LFO page in the Maschine theme…</figcaption>
</figure>

<figure class="screenshot">
  <img src="/manual/screenshots/theme-palenight-blue-green-lfo.png" alt="The same LFO page in the Palenight Blue Green theme: a deep blue-grey background, white and lavender text, the TRI and SYNC buttons filled purple, and the wave drawn in blue." loading="lazy" />
  <figcaption>…and in Palenight Blue Green.</figcaption>
</figure>

### Making your own

A theme is one small file that lists only what it changes from another theme.
DECKARD reloads it each time you save, so you can tweak it with the MK3 in front of
you. [THEMING.md](https://github.com/Panic-Signals/Deckard/blob/main/THEMING.md) in
DECKARD's repository shows how, step by step.

DECKARD's own window can't be themed yet.

## Controller scripts

Every button, pad, knob, light and screen on the MK3, and the Launchpad Pro's session
grid, is run by a Lua script that you can replace. **Controller ▸ Open Controller
Scripts Folder** opens your scripts folder. Its `defaults` folder holds DECKARD's own
scripts.

1. Copy a script from `defaults` to the same place in your folder. For the Control
   page, copy `defaults/pages/control.lua` to `pages/control.lua`.
2. Edit your copy. DECKARD reloads it when you save.
3. To go back to DECKARD's version, delete your copy.

[docs/controller-api.md](https://github.com/Panic-Signals/Deckard/blob/main/docs/controller-api.md)
in DECKARD's repository describes what a script can do.
