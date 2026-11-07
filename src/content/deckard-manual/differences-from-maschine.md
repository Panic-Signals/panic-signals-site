---
title: Differences from Maschine
order: 3
description: What works the same, what works differently, what isn't there yet, and what happens to your files.
maschine: ['the Maschine 3 Software Manual']
---

## What works the same

Most of Maschine is there and works as NI's manual describes:

- the **Ideas view** (scenes and patterns) and the **Song view** (sections);
- groups of 16 sounds, the **pattern editor** and **piano roll**, with velocity,
  probability and MIDI controller lanes;
- the **Sampler**, sampling, slicing and time-stretching;
- the **drum synths**, Bass Synth, Poly Synth, the **effects** and the **Perform FX**;
- **Note Repeat and the Arpeggiator**, scales and chords, Euclidean patterns;
- **Lock** snapshots, **Macros**, automation recorded from the knobs;
- the **Browser** (<kbd>F4</kbd>), with your Maschine library if Maschine 3 is
  installed;
- Maschine's keyboard shortcuts, including Take and Step undo.

DECKARD's versions of Maschine's instruments and effects are its own sound engines,
written to behave like Maschine's. They're close, but not identical.

## What works differently

| In Maschine | In DECKARD |
| --- | --- |
| **AUTO** on the MK3 writes automation while you hold it. | **AUTO** is a switch: press it once to start writing, again to stop. |
| The controller screens look the way NI drew them. | The screens are drawn by DECKARD and can be [themed](/software/deckard/manual/themes-and-scripts). |
| The controller's behaviour is built in. | Each page is an editable script: **Controller ▸ Open Controller Scripts Folder**. |
| Pad pressure only shapes Note Repeat. | Each sound's **Pad Touch** setting can record pressure as aftertouch or a CC. See [Expressive recording](/software/deckard/manual/expression). |
| A plug-in's extra outputs reach the mixer by routing them into other sounds' audio inputs. | Each extra output gets its own mixer strip. See [Multi-output plug-ins](/software/deckard/manual/multi-output-plug-ins). |
| Plug-ins run on macOS and Windows. | Plug-ins run on macOS, Windows and Linux. DECKARD loads VST3 plug-ins, VST2 plug-ins that have a VST3 version, and Audio Units on macOS. On Linux, Windows plug-ins run through Wine and yabridge (**Preferences ▸ Plug-ins ▸ Windows plug-ins**). |
| **Edit ▸ Undo** steps back one at a time. | **Edit ▸ Undo History** also jumps back up to 30 steps at once. |

## Not there yet

These parts of Maschine aren't in DECKARD yet:

- **Aux sends** in the mixer, and internal audio inputs between channels.
- **Recording audio onto a track** while the song plays (sampling works).
- Some context-menu items: Rename, Clear, Double and Color on patterns, scenes and
  sections.
- Editing a clip's notes, and the MK3's clip pages.
- **MIDI mode** (the MK3 as a plain MIDI controller), the footswitch input, NKS and
  the light guide.
- Running DECKARD as a plug-in inside a DAW.

## Files and Maschine

- **DECKARD reads and writes Maschine projects, groups, sounds and presets.** Projects
  it saves open in Maschine 3, and files it doesn't change are written back byte for
  byte.
- **What DECKARD adds is saved in an extra block** inside the `.mxprj`: note
  expression, LFOs and envelopes, mod-matrix routes, CC routes and extra-output strips.
  Maschine skips the block, so the project still opens there.
- **Replicant and Plaits** are saved like plug-ins. Maschine reports them as missing
  plug-ins and can't play them, but keeps their settings when it saves.

<aside class="callout warning" role="note">
  <p class="callout-title">Saving in Maschine deletes DECKARD’s extras</p>
  <p>DECKARD opens Maschine projects and saves them in Maschine’s format, so the same file opens in both programs. But if you open a project in Maschine and <strong>save it there</strong>, Maschine deletes everything only DECKARD has:</p>
  <ul>
    <li>LFOs and envelopes, and the mod-matrix and MIDI CC routes they drive;</li>
    <li>note expression: polyphonic aftertouch, MPE pressure, slide and pitch, and release velocity;</li>
    <li>the mixer strips of multi-output plug-ins.</li>
  </ul>
  <p>Your notes, patterns, sounds and settings that Maschine has too are kept. Replicant and Plaits keep their settings, but Maschine can’t play them.</p>
  <p><strong>To keep DECKARD’s features,</strong> save in Maschine with <strong>File ▸ Save As…</strong> under a new name, or keep a copy of the project before you open it in Maschine.</p>
</aside>
