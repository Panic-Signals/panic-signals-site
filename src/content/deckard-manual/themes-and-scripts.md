---
title: Themes and controller scripts
order: 12
description: Restyle the MK3's screens and DECKARD's window with a theme, and change what any button or page does with DECKARD's controller scripts.
---

## Themes for the MK3's screens

DECKARD draws the MK3's screens itself, so they can be restyled: colours, fonts and
text sizes, plus an optional animated border on the chosen button. Every page uses the
theme, so one file changes them all.

Choose one in **Preferences ▸ Hardware ▸ Controller theme**. DECKARD comes with six:

- **Maschine:** the look of Maschine's own screens.
- **Palenight:** lavender text and purple and cyan accents on black, so the screens
  blend into the MK3's bezel. A new install starts with it.
- **Palenight Blue Green:** the same colours on a deep blue-grey background.
- **Solarized Dark.**
- **LCD:** one colour on a dark background, like the display of an old sampler. The
  pads and group buttons light in that colour too. **LCD colour**, under the theme,
  chooses **Yellow / black**, **Red / black** or **Blue / white**.
- **Deep:** black screens, with whatever is lit in the focused group's colour and text
  in IBM Plex, the font of DECKARD's window. Each knob's dial sits at the left of its
  cell, the parameters' section names run along one row above the knobs' names, and the
  chain is a strip under the top buttons: each device's name after an instrument or FX
  icon, the focused one framed. On the Control page, a
  plug-in's own picture shows on the left screen when its first four knobs have no
  pictures of their own.

> **Note:** Only in the next release: Deep, Palenight Blue Green, and Palenight's black
> background. Until then, Palenight is the deep blue-grey one.

<figure class="screenshot">
  <img src="/manual/screenshots/theme-maschine-lfo.png" alt="The LFO page on the MK3's screens in the Maschine theme." loading="lazy" />
  <figcaption>The LFO page in the Maschine theme…</figcaption>
</figure>

<figure class="screenshot">
  <img src="/manual/screenshots/theme-palenight-blue-green-lfo.png" alt="The same LFO page in the Palenight Blue Green theme: a deep blue-grey background, white and lavender text, the TRI and SYNC buttons filled purple, and the wave drawn in blue." loading="lazy" />
  <figcaption>…and in Palenight Blue Green.</figcaption>
</figure>

<figure class="screenshot">
  <img src="/manual/screenshots/theme-deep-control.png" alt="The Control page on the MK3's screens in the Deep theme: black screens with the Master, Group and Sound buttons along the top, MASTER filled red. Under them the chain in one row, each device's name after an instrument or FX icon: Pigments, framed, then EQ, Compressor, Raum and a plus for a new one. Below, red pictures over the knobs: a filter's curve over Cutoff and Resonance, an envelope over Attack and Release, and a compressor's curve over Threshold and Ratio, with FILTER, AMP ENV and COMP above the knobs' names and values." loading="lazy" />
  <figcaption>The Control page in Deep, with pictures over the knobs.</figcaption>
</figure>

### Making your own

A theme is one small file that lists only what it changes from another theme.
DECKARD reloads it each time you save, so you can tweak it with the MK3 in front of
you. [THEMING.md](https://github.com/Panic-Signals/Deckard/blob/main/THEMING.md) in
DECKARD's repository shows how, step by step.

## Themes for DECKARD's window

**Preferences ▸ Hardware ▸ Desktop theme** restyles DECKARD's own window with any of
the themes. It is separate from the controller's theme, so the window and the
MK3 can each have their own.

- A theme changes the window's backgrounds, lines and text, in every view.
- Groups, sounds, patterns and scenes keep the colours you gave them, in every theme.
- **Maschine** is the ordinary dark window.
- A theme you made yourself restyles the MK3's screens, but not the window yet.

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

## Plug-in mappings

> **Note:** Only in the next release.

On the Control page, the MK3 draws what each knob does above it: a filter's curve over
its cutoff and resonance, an envelope over its times, an EQ band, a compressor's curve,
an LFO's wave, the list of a switch's values, and a dial over every other knob. DECKARD
works these out from the knobs' names and values, for any plug-in.

A **mapping** goes further for one plug-in: a small Lua file that puts its parameters on
the knobs in the order you want, gives its pages their names, and says which pictures go
over which knobs and how to read its values in hertz, milliseconds and decibels.

1. Put the file in the `mappings` folder of your scripts folder (**Controller ▸ Open
   Controller Scripts Folder**), in a folder named after the plug-in's maker:
   `mappings/acme/ladder.lua`.
2. Load the plug-in. Its pages come first on the Control page, then the rest of its
   parameters, eight a page. A plug-in whose preset already has its own pages keeps them.
3. DECKARD reloads the mapping each time you save it. If it has a mistake, such as a
   name it uses but never declares, the MK3 shows the error and the plug-in goes back to
   its usual pages until you fix it.

DECKARD comes with mappings for Arturia Pigments, Native Instruments Massive X and
Monark, Plugin Alliance bx_oberhausen and Vital. A mapping of yours with the same
folder and file name replaces DECKARD's.

The "Plug-in mappings" section of
[docs/controller-api.md](https://github.com/Panic-Signals/Deckard/blob/main/docs/controller-api.md)
describes the file, with an example. To write one for a new plug-in,
`plugin-probe` in DECKARD's repository lists your plug-ins and their parameters, and
measures what a synthesizer's knobs do in hertz and milliseconds.
