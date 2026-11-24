---
title: Themes and controller scripts
order: 12
description: Restyle the MK3's screens and DECKARD's window with a theme, and change what any button or page does with DECKARD's controller scripts.
---

## Themes for the MK3's screens

DECKARD draws the MK3's screens itself, so they can be restyled: colours, fonts and
text sizes, plus an optional animated border on the chosen button. Every page uses the
theme, so one file changes them all.

Choose the screens' theme in **Preferences ▸ Hardware ▸ Hardware theme**. **Desktop
theme** is the menu above it, and it does not change the MK3. DECKARD comes with
seventeen. Five are drawn in full:

- **Maschine:** the look of Maschine's own screens.
- **Palenight:** lavender text and purple and cyan accents on black, so the screens
  blend into the MK3's bezel. A new install starts with it.
- **Palenight Blue Green:** the same colours on a deep blue-grey background.
- **Solarized Dark.**
- **LCD:** one colour on a dark background, like the display of an old sampler. The
  pads and group buttons light in that colour too. **LCD colour**, under the theme,
  chooses **Yellow / black**, **Red / black** or **Blue / white**.

Twelve more are palettes for the screens: **Nord**, **Gruvbox**, **Dracula**,
**Catppuccin**, **Tokyo Night**, **One Dark**, **Rosé Pine**, **Kanagawa**,
**Everforest**, **Monokai**, **Ayu** and **GitHub Dark**. They are not offered as
desktop themes.

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

### Editing colours

Under the two menus, **Edit** has a **Desktop** tab and a **Hardware** tab. Changing
one does not change the other. The screens and the window update as you change a
colour.

**Desktop** sets the window's **Background** and **Text**. Panels, buttons and
selection are mixed from those two. Groups, sounds, patterns and scenes keep the
colours you gave them. **Reset** puts the desktop theme chosen above back.

**Hardware** sets the screens:

- **Background**, the screens behind everything, and **Text**, the names and values.
- **Muted**, for labels and ticks.
- **Accent**, for knobs, markers, and the orange parts of a plug-in picture.
- **Handles**, for the dots on the EQ, filter and effect plots, and the dot beside a
  knob while that parameter is modulated.
- **Text on colour**, for writing drawn on a group or pad colour.
- **Button** and **Button text**, and **Selected** and **Selected text**, for the
  chosen button or tab. **Button** also colours the lines on a plot. It does not fill
  the plot, and **Text** does not recolour a plug-in picture.

Type a name next to **Theme name** and click **Save theme**. The theme appears in
**Hardware theme**. **Export** saves that file so you can send it to someone. They
click **Import** and choose the file. **Remove my copy** deletes only your file, so a
theme that came with DECKARD comes back. Maschine and LCD keep their own names: save a
variation under a new one.

### Making your own

A theme is one small file that lists only what it changes from another theme.
DECKARD reloads it each time you save, so you can tweak it with the MK3 in front of
you. [THEMING.md](https://github.com/Panic-Signals/Deckard/blob/main/THEMING.md) in
DECKARD's repository shows how, step by step.

## Themes for DECKARD's window

**Preferences ▸ Hardware ▸ Desktop theme** restyles DECKARD's own window with any of
the five hand-written themes. It is separate from **Hardware theme**, so the window
and the MK3 can each have their own. The twelve palettes are for the screens only.

- A theme changes the window's backgrounds, lines and text, in every view.
- Groups, sounds, patterns and scenes keep the colours you gave them, in every theme.
- **Maschine** is the ordinary dark window.
- A theme file you saved restyles the MK3. The window's own background and text are set on the **Desktop** tab.

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
