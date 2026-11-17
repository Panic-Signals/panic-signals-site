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

<div class="split">

| In Maschine | In DECKARD |
| --- | --- |
| **AUTO** on the MK3 writes automation while you hold it. | **AUTO** is a switch: press it once to start writing, again to stop. |
| The controller screens look the way NI drew them. | The screens are drawn by DECKARD and can be [themed](/software/deckard/manual/themes-and-scripts). |
| The controller's behaviour is built in. | Each page is an editable script: **Controller ▸ Open Controller Scripts Folder**. |
| Pad pressure only shapes Note Repeat. | Each sound's **Pad Touch** setting can record pressure as aftertouch or a CC. See [Expressive recording](/software/deckard/manual/expression). |
| A plug-in's extra outputs reach the mixer by routing them into other sounds' audio inputs. | Each extra output gets its own mixer strip. See [Multi-output plug-ins](/software/deckard/manual/multi-output-plug-ins). |
| Plug-ins run on macOS and Windows. | Plug-ins run on macOS, Windows and Linux. DECKARD loads VST3 plug-ins, VST2 plug-ins that have a VST3 version, and Audio Units on macOS. On Linux, Windows plug-ins run through Wine and yabridge (**Preferences ▸ Plug-ins: Manager ▸ Windows plug-ins**). |
| **Edit ▸ Undo** steps back one at a time. | **Edit ▸ Undo History** also jumps back up to 30 steps at once. |

</div>

## Ratchets


A ratchet makes one note play several times inside its own length. Maschine has no
ratchets; in DECKARD every note can have one.

<figure class="screenshot">
  <img src="/manual/screenshots/ratchet-velocity.png" alt="The pattern editor with three notes on sound 1 and the Velocity lane under them. The first note is split by three thin lines into four hits, and its velocity stems step down from left to right. The second note is plain and has one stem. The third note is split into eight hits, and its stems step up." loading="lazy" />
  <figcaption>A four-hit ratchet falling, a plain note, and an eight-hit ratchet rising.</figcaption>
</figure>

- **Repeats** is how many times the note plays, from 1 (a plain note) to 16. The hits
  share the note's length evenly, so a longer note gives slower hits. Drag the note's
  end and the hits spread out or close up with it.
- **Shape** sets the hits' velocities:
  - **Flat:** every hit plays at the note's velocity.
  - **Down:** the first hit plays at the note's velocity, and each one after it is
    quieter, heading for the **Floor**.
  - **Up:** the first hit plays at the note's velocity, and each one after it is
    louder. The last hit plays at the **Ceiling**.
- **Floor** (0 to start with) and **Ceiling** (127 to start with) are where a falling
  or rising ratchet is heading. A Floor above the note's velocity, or a Ceiling below
  it, changes nothing.

To give a note a ratchet:

1. Select one or more notes in the pattern editor or piano roll.
2. Right-click one and open **Ratchet**.
3. Drag **Repeats**, or double-click it and type a number, and choose **Flat**,
   **Down** or **Up**. **Floor** and **Ceiling** are below.

You can also choose **Ratchet** in the list of lanes under the notes (with
**Velocity** and **Probability**) and drag a note's bar up or down to set its
Repeats.

Each hit after the first is drawn as a thin line across the note, and as a fainter
stem in the **Velocity** lane.

- **Probability** is rolled once for the whole note: all its hits play, or none do.
- Hits that would start after the pattern's end don't play.
- A note's pitch, slide and pressure curves carry on through the hits. They don't
  start again on each one.
- **Export MIDI** writes each hit as its own note.

On the MK3, ratchets are on the [Step and Events pages](/software/deckard/manual/maschine-mk3#ratchets-on-the-step-and-events-pages).



In Maschine, an audio loop always starts on the pattern's first beat. In DECKARD you
can slide it.

- **Drag the loop's waveform** in the pattern editor: its sound's row in the drum
  grid, or anywhere without a note in the piano roll. The waveform follows the
  pointer and its new place shows as bars, beats and sixteenths.
- It snaps to the grid. Hold <kbd>SHIFT</kbd> to move it freely.
- Each pattern places the same loop on its own.
- A recording from an external input isn't corrected for latency: drag a late take
  into place this way.

Maschine plays the loop from the first beat again.

## Without a controller

Three panels in the **View** menu do in the window what otherwise needs hardware:

- **View ▸ Note Repeat / Arp** switches Note Repeat and the Arpeggiator on and sets
  them. They work on the computer keyboard's notes (<kbd>⌘K</kbd>) as well as on pads.
- **View ▸ Lock** takes, recalls and morphs Lock snapshots.
- **View ▸ MIDI Monitor** lists what comes in on each MIDI input, the MK3's pads
  included, and what DECKARD sends to each output. It helps when setting up MPE
  keyboards and MIDI CC routes.

## Session recording

> **Note:** Only in the next release.

DECKARD can record its own master output to a WAV file, for capturing a live set or
archiving a session. Maschine has nothing like it.

To record:

1. Choose **File ▸ Record Session to File…** and pick where to save it. Recording
   starts and the **Session Recorder** window opens.
2. Choose **File ▸ Stop Session Recording** when you're done.

The file is named `session-<project>-<date>-<time>.wav` to start with. DECKARD records
the **master bus**, after its level and pan, as **24-bit stereo at the engine's sample
rate**. Recording is continuous and independent of the transport: it captures exactly
what you'd hear at the master out, whether or not the song is playing.

### The Recorder window

**View ▸ Session Recorder** shows or hides the recorder. It's a fixed-size window with a
**📌 Pin** toggle, on to start with, that floats it above other windows so you can
glance at the timer while you work.

<figure class="screenshot narrow">
  <img src="/manual/screenshots/session-recorder.png" alt="The DECKARD Recorder window mid-set. Its title bar reads DECKARD Recorder. Below, a red dot and RECORDING SESSION sit beside a highlighted 📌 Pin toggle. A large centred timer reads 00:42:17, and under it: started 22:14, 730.7 MB on disk, ~3h 51m left. A red scrolling waveform fills the middle. Green L and R level meters below it read peak -1.3 dB and peak -2.6 dB. A line reads 48 kHz · 24-bit · stereo, then the file name session-night-run-2026-11-17-2214.wav, and a Stop button." loading="lazy" />
  <figcaption>The Session Recorder window partway through a set.</figcaption>
</figure>

It shows:

- a running **set timer**, counting up as HH:MM:SS;
- a scrolling **waveform** of the master output;
- **L** and **R** level meters with their **peak dB**;
- the **time remaining** before the recording has to stop;
- the sample rate and the file name.

### One recorder at a time

Session recording and the Sampler's own recorder share the engine's single master tap,
so only one can run at a time. While a session recording is going, sampling into the
**Sampler** is unavailable, and starting a session recording is unavailable while
you're sampling.

### When it stops on its own

A session records to one WAV file, and DECKARD keeps that file valid as it goes, so a
recording survives a crash. It also stops cleanly on its own when:

- free disk space nears the reserve set in **Preferences** (about 1 GB to start with);
- the file reaches the **4 GB** WAV size ceiling — it's a single file and isn't split;
- the audio device or the sample rate changes while it's recording.

### Preferences

**Preferences** has a **recording folder** and a **disk-reserve** (in MB) setting for
session recording.

=======

## Not there yet

These parts of Maschine aren't in DECKARD yet:

- **Punching in and re-recording audio takes** while the song plays. Sampling works,
  and a recorded loop plays with its pattern.
- Some context-menu items: Clear and Color on scenes, and Rename, Clear and Color on
  sections.
- Editing a clip's notes, and the MK3's clip pages.
- **MIDI mode** (the MK3 as a plain MIDI controller), the MK3's footswitch input and the
  NKS light guide.
- Running DECKARD as a plug-in inside a DAW.

## Files and Maschine

- **DECKARD reads and writes Maschine projects, groups, sounds and presets.** Projects
  it saves open in Maschine 3, and files it doesn't change are written back byte for
  byte.
- **What DECKARD adds is saved in an extra block** inside the `.mxprj`: note
  expression, ratchets, LFOs and envelopes, mod-matrix routes, CC and CV routes, each
  sound's Pad Touch settings and extra-output strips.
  Maschine skips the block, so the project still opens there.
- **Replicant, Plaits, Zhora and the Tuner** are saved like plug-ins. Maschine reports them as missing
  plug-ins and can't play them, but keeps their settings when it saves.

<aside class="callout warning" role="note">
  <p class="callout-title">Saving in Maschine deletes DECKARD’s extras</p>
  <p>DECKARD opens Maschine projects and saves them in Maschine’s format, so the same file opens in both programs. But if you open a project in Maschine and <strong>save it there</strong>, Maschine deletes everything only DECKARD has:</p>
  <ul>
    <li>LFOs and envelopes, and the mod-matrix, MIDI CC and CV routes they drive;</li>
    <li>note expression: polyphonic aftertouch, MPE pressure, slide and pitch, and release velocity;</li>
    <li>ratchets: each note plays once again;</li>
    <li>where you moved an audio loop to: it starts on the first beat again;</li>
    <li>each sound’s Pad Touch settings;</li>
    <li>the mixer strips of multi-output plug-ins.</li>
  </ul>
  <p>Your notes, patterns, sounds and settings that Maschine has too are kept. Replicant and Plaits keep their settings, but Maschine can’t play them.</p>
  <p><strong>To keep DECKARD’s features,</strong> save in Maschine with <strong>File ▸ Save As…</strong> under a new name, or keep a copy of the project before you open it in Maschine.</p>
</aside>
