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

## The status bar is the overlay

Maschine shows an overlay on screen when you touch the JAM's encoder. DECKARD shows
the same settings as one line in the status bar.

1. **Touch the encoder** to open what the view has: the scale in Keyboard, Piano Roll
   and Notes, Note Repeat or the Arp while they're on, morphing in Lock View.
2. **Turn** to pick a line, and **press** to change it.
3. **Turn** to set it, and **press** again to go back to the lines.

It closes after six seconds without a touch. <kbd>BROWSE</kbd> opens the library in
DECKARD's own browser panel, driven by the same encoder and D-pad.

## What works differently

<div class="split">

| In the JAM manual | In DECKARD |
| --- | --- |
| The on-screen overlay. | The status bar, and the main window's browser. |
| Pads play harder or softer with pressure. | Every hit plays at the song's Fixed Velocity. |
| <kbd>SHIFT</kbd> + <kbd>▶</kbd> and two scene buttons set a loop range. | <kbd>SHIFT</kbd> + <kbd>▶</kbd> switches looping on and off. DECKARD has no scene loop range yet. |
| <kbd>TUNE</kbd> tunes a group. | It moves the group's Samplers together. Plug-in instruments don't move. |
| <kbd>AUTO</kbd> writes Level and Swing. | Holding <kbd>AUTO</kbd> and moving a strip writes the parameters of the Control page. The mixer's level and swing aren't written yet. |
| <kbd>SHIFT</kbd> + <kbd>E</kbd> shows Variation's settings on screen. | It shows the focused sound's Groove ▸ Variation page on the strips. |
| <kbd>LOCK</kbd> again updates the snapshot. | <kbd>LOCK</kbd> recalls it, as on DECKARD's MK3. In Lock View it updates the snapshot in focus. |
| Plug-in mode, MIDI mode, the Controller Editor, TS EDIT and INSTANCE. | Not in DECKARD. |

</div>

## Settings

- **Preferences ▸ MIDI ▸ Maschine JAM** switches the JAM on or off.
- **Preferences ▸ MIDI ▸ Focus the group MIDI is recorded into** also decides what a
  Project View pad does. On (as a new install has it), picking another group's pattern
  focuses that group. Off, the pattern goes on and the focus stays where it was.
- **Preferences ▸ Hardware ▸ Relative level touchstrips:** a touch on a mixer strip
  no longer jumps the value to your finger. It picks the value up where it is, and
  moving your finger changes it by the distance moved. <kbd>CONTROL</kbd> stays an
  ordinary fader.
- **Preferences ▸ Audio ▸ Input level** sets the levels the JAM's <kbd>IN1</kbd> and
  <kbd>IN2</kbd> show and turn. They are your audio interface's first two stereo
  inputs.

## The footswitch

With a footswitch plugged into the JAM, the tip plays and the ring records.
