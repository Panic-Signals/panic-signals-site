---
title: The Maschine JAM
order: 6
description: Use a Maschine JAM with DECKARD, alongside or instead of an MK3, and see what works differently from the JAM manual.
maschine: ['the Maschine JAM Manual']
---

DECKARD drives a Maschine JAM over USB itself, with no NI software running. The JAM
works as the *Maschine JAM Manual* says, with the changes in this chapter. It also
works beside an MK3: picking a group on either one moves both.

> **Note:** The JAM has been played with DECKARD on Windows only. It hasn't been tried
> on macOS or Linux yet.

## Connecting a JAM

Plug it in. The status bar says "Maschine JAM connected".

- **On Windows, NI's services have to be stopped.** While they run, the pads turn
  orange and the lights flash at every press. When a JAM connects, DECKARD offers to
  stop them, which asks for administrator approval. Maschine needs them, so start
  them again in **Preferences ▸ MIDI**, or restart Windows, before you go back to
  Maschine.
- **Don't run Maschine at the same time.** Both would act on every press and overwrite
  each other's lights. **Preferences ▸ MIDI ▸ Maschine JAM** switches the JAM off in
  DECKARD.

## The on-screen overlay

Touching the JAM's encoder opens DECKARD's overlay: the page that view has, drawn in a
small window of its own over the app. The bar at the top carries the page's name and
which page of that type it is. A page is a row of eight columns, and a page with fewer
settings leaves the rest of the row empty rather than spacing them out.

<figure class="screenshot">
  <img src="/manual/screenshots/jam-overlay.png" alt="The overlay showing Scale 1/2: a bar reading Scale 1/2, then eight columns. SCALE runs over Root Note C3, Bank Main and Type Chromatic; CHORD over Mode Off; PAD LAYOUT over Mode Isomorph, Layout Sequential and Type Chromatic. A white rule underlines Root Note." loading="lazy" />
  <figcaption>The Scale page, page 1 of 2. The white rule marks the setting the encoder is on.</figcaption>
</figure>

1. **Touch the encoder** to open what the view has: the scale in Keyboard, Piano Roll
   and Notes, Note Repeat or the Arp while they're on, morphing in Lock View.
2. **Turn** to move along the row, and **press** to edit the setting you are on — the
   one in corner brackets. **Turn** to change it, and **press** again to leave it.
3. **Turn past the end of the row** to reach the next page. The counter in the bar
   moves, and never stops on a page with nothing on it.

**Drag the bar** to move the window. Its place is remembered, so it comes back beside
the app next time. Nothing else in the window takes a click: the settings belong to
the encoder.

A page that belongs to a button goes about two seconds after you stop touching — the
scale, Note Repeat, the Arp, Swing, Tune and Lock — and touching the encoder brings it
back. A page that belongs to a mode stays until you leave that mode: GRID, REC MODE,
TEMPO, PERFORM FX, and the Variation page on <kbd>SHIFT</kbd> + <kbd>E</kbd>. Changing
the view closes whatever is up, those included.

**Preferences ▸ Hardware ▸ Show the on-screen overlay** turns the window off. The pages
still run: the encoders, the lights and every page behave as they always did, but
nothing is drawn.

<kbd>BROWSE</kbd> opens the library in DECKARD's own browser panel, driven by the same
encoder and D-pad.

## What works differently

<div class="split">

| In the JAM manual | In DECKARD |
| --- | --- |
| <kbd>BROWSE</kbd> opens an overlay over the app. | DECKARD's own browser panel, in the main window, driven by the same encoder and D-pad. |
| Pads play harder or softer with pressure. | Every hit plays at the song's Fixed Velocity. |
| <kbd>SHIFT</kbd> + <kbd>▶</kbd> and two scene buttons set a loop range. | <kbd>SHIFT</kbd> + <kbd>▶</kbd> switches looping on and off. DECKARD has no scene loop range yet. |
| In the Pad view, a pad plays its sound. | It does, except for a sound whose Audio plug-in is in Loop mode: then the pad switches its loop on or off in the playing pattern. A pad stays lit while its loop plays. See [Loops on their pads](/software/deckard/manual/maschine-mk3#loops-on-their-pads). |
| <kbd>TUNE</kbd> tunes a group. | It moves the group's Samplers together. Plug-in instruments don't move. |
| <kbd>AUTO</kbd> writes Level and Swing. | Holding <kbd>AUTO</kbd> and moving a strip writes the parameters of the Control page. The mixer's level and swing aren't written yet. |
| <kbd>SHIFT</kbd> + <kbd>E</kbd> shows Variation's settings on screen. | The same page in the overlay, and its **Mode** has a third engine, **Euclid**, which Maschine doesn't have. |
| <kbd>LOCK</kbd> again updates the snapshot. | <kbd>LOCK</kbd> recalls it, as on DECKARD's MK3. In Lock View it updates the snapshot in focus. |
| Plug-in mode, MIDI mode, the Controller Editor, TS EDIT and INSTANCE. | Not in DECKARD. |

</div>

## Settings

- **Preferences ▸ MIDI ▸ Maschine JAM** switches the JAM on or off.
- **Preferences ▸ MIDI ▸ Focus the group MIDI is recorded into** also decides what a
  Project View pad does. On (as a new install has it), picking another group's pattern
  focuses that group. Off, the pattern goes on and the focus stays where it was.
- **Preferences ▸ Hardware ▸ Show the on-screen overlay** switches the overlay's window
  off, and back on. The JAM's touchstrips are unaffected.
- **Preferences ▸ Hardware ▸ Relative level touchstrips:** a touch on a mixer strip
  no longer jumps the value to your finger. It picks the value up where it is, and
  moving your finger changes it by the distance moved. <kbd>CONTROL</kbd> stays an
  ordinary fader.
- **Preferences ▸ Audio ▸ Input level** sets the levels the JAM's <kbd>IN1</kbd> and
  <kbd>IN2</kbd> show and turn. They are your audio interface's first two stereo
  inputs.

## The footswitch

With a footswitch plugged into the JAM, the tip plays and the ring records.
