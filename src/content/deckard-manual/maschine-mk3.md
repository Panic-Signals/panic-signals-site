---
title: The Maschine MK3
order: 4
description: The pages DECKARD adds to the MK3 (LFOs, the mod matrix, a step grid) and the buttons that work differently.
maschine: ['the Maschine MK3 Manual']
---

DECKARD runs the MK3 with its own controller layer. Almost every button does what the
MK3 manual says. This chapter covers the exceptions.

## Which layer runs the MK3

DECKARD can run the MK3 in two ways. **Preferences ▸ Hardware ▸ Controller** chooses:

- **DECKARD** is DECKARD's own controller layer, and what a new install uses.
  Everything in this chapter, and the
  [themes and scripts](/software/deckard/manual/themes-and-scripts), belong to it.
- **Maschine scripts** runs the MK3 from the controller scripts of your own Maschine
  installation. The MK3 then behaves as in Maschine: the pages this chapter adds
  aren't there, <kbd>AUTO</kbd> writes only while held, and themes don't apply.
- **Automatic** uses Maschine's scripts when Maschine is installed, and DECKARD's
  layer when it isn't.

With Maschine's scripts running, **Controller ▸ Show Controller** (or the four-squares
button in the header) shows a controller on screen that you can click, so those pages
work without the hardware. **Controller ▸ Controller Model** chooses which controller
it is.

## At a glance

<figure>
  <img src="/manual/diagrams/mk3-overview.svg" alt="Line drawing of the Maschine MK3. Eight controls are marked in cyan: SHIFT, SELECT, SOLO, STEP, AUTO, KEYBOARD, PAD MODE and the two screens." width="1000" height="770" />
  <figcaption>The MK3, with the controls DECKARD adds to or changes marked in cyan.</figcaption>
</figure>

| | Control | In DECKARD |
| --- | --- | --- |
| 1 | <kbd>SHIFT</kbd> | Opens the new pages with <kbd>SELECT</kbd>, <kbd>SOLO</kbd> and <kbd>STEP</kbd>. |
| 2 | <kbd>SHIFT</kbd> + <kbd>SELECT</kbd> | [The LFO page](#the-lfo-page). |
| 3 | <kbd>SHIFT</kbd> + <kbd>SOLO</kbd> | [The mod matrix page](#the-mod-matrix-page). |
| 4 | <kbd>SHIFT</kbd> + <kbd>STEP</kbd> | [The step grid](#the-step-grid). |
| 5 | <kbd>AUTO</kbd> | [A switch, not a hold](#auto-is-a-switch). |
| 6 | <kbd>KEYBOARD</kbd> | Two more knob pages: [Pad Touch](#pad-touch-on-the-keyboard-page). |
| 7 | Screens | Drawn by DECKARD, in the [theme](/software/deckard/manual/themes-and-scripts) you choose. |
| 8 | <kbd>PAD MODE</kbd> | [A loop's pad switches it, and stays lit while it plays](#loops-on-their-pads). |

Each new page closes the same way it opens: press the same combination again, or any
other page's button.

## The LFO page

<kbd>SHIFT</kbd> + <kbd>SELECT</kbd> shows the project's LFOs and envelopes. What they
do is described in [Modulation](/software/deckard/manual/modulation#lfos-and-envelopes).

<figure>
  <img src="/manual/diagrams/mk3-lfo-page.svg" alt="The LFO page: display buttons Sine, Square, Triangle, Saw, Random, Sync, Env and Trig; the left screen shows LFO 1, the right screen a stepped triangle wave; knobs Shape, Rate, Phase, Level, Quantize, Trigger and Fade in." width="1000" height="380" />
  <figcaption>The LFO page’s controls.</figcaption>
</figure>

- **Pads 1–16 are the 16 LFOs.** A lit pad focuses its LFO. An unlit pad makes a new
  one there.
  - <kbd>ERASE</kbd> + pad removes an LFO.
  - <kbd>MUTE</kbd> + pad mutes or unmutes it. Muted LFOs light red.
- **Display buttons 1–5** pick the shape. Button 5 is Random; press it again for
  Wander. **6 SYNC** switches between tempo-synced
  and free (Hz). **7 ENV** switches the slot to an envelope. **8 TRIG** sets the
  trigger to the focused sound, or off. <kbd>SHIFT</kbd> + **button 8** (DELETE)
  removes the focused LFO.
- **Knobs 1–7** set Shape, Rate, Phase, Level, Quantize, Trigger and Fade in. Fade in
  works once the LFO has a trigger.
- **The left screen** shows the LFO's name, **the right screen** its wave.

In Envelope mode, buttons 1–5 go dark, button 6 becomes **RETRIG**, and button 8 sets
the trigger to the focused sound. Knobs 1–7 set Attack, Decay, Sustain, Release,
Level, Quantize and Trigger.

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-lfo.png" alt="The MK3's two screens on the LFO page, showing LFO 1 and a stepped triangle wave." loading="lazy" />
  <figcaption>The LFO page on the MK3’s screens: LFO 1, a tempo-synced triangle stepped by Quantize.</figcaption>
</figure>

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-envelope.png" alt="The MK3's two screens on the LFO page in Envelope mode, showing an ADSR shape." loading="lazy" />
  <figcaption>The same page in Envelope mode.</figcaption>
</figure>

## The mod matrix page

<kbd>SHIFT</kbd> + <kbd>SOLO</kbd> lists every modulation route in the project, one
per column, eight at a time. What routes are is described in
[Modulation](/software/deckard/manual/modulation#the-mod-matrix).

<figure>
  <img src="/manual/diagrams/mk3-mod-matrix-page.svg" alt="The mod matrix page: each of the eight columns is a route with rows Source, Group, Sound, Module, Destination and Depth. The display buttons move a column's highlighted row; the knobs turn it." width="1000" height="380" />
  <figcaption>One route per column. The highlighted row is the one its knob turns.</figcaption>
</figure>

- **Each column is a route**, with rows Source, Group, Sound, Module, Destination and
  Depth.
- **The display button above a column** moves its highlight down a row, and from Depth
  back to Source. The page opens with Depth highlighted.
- <kbd>SHIFT</kbd> + **a column's display button** switches that route between Range
  and Add (see [The mod matrix](/software/deckard/manual/modulation#the-mod-matrix)).
  Depth reads Add for an Add route.
- **The knob below a column** changes its highlighted row.
- <kbd>ERASE</kbd> + **knob** removes that route.
- **The empty column** after the last route makes a new one. It becomes a route once
  it has a Destination.
- <kbd>◀</kbd> and <kbd>▶</kbd> show the previous or next eight routes.

To send an LFO out as a MIDI controller, turn **Group** past the last group to
**MIDI**. The rows then read Port, Channel and CC.

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-mod-matrix.png" alt="The MK3's two screens on the mod matrix page, listing routes in columns." loading="lazy" />
  <figcaption>The mod matrix on the MK3’s screens.</figcaption>
</figure>

## The step grid

<kbd>SHIFT</kbd> + <kbd>STEP</kbd> turns the eight display buttons into steps, so the
pads stay free to choose what each step plays.

<figure>
  <img src="/manual/diagrams/mk3-step-grid.svg" alt="The step grid: display buttons are steps 1 to 8; the left screen shows a piano roll, the right screen eight steps; knobs 1 to 4 are Position, Pitch, Velocity and Length." width="1000" height="380" />
  <figcaption>The step grid in Keyboard mode.</figcaption>
</figure>

1. **Choose what to place** with the pads:
   - in <kbd>PAD MODE</kbd>, a pad picks a sound;
   - in <kbd>KEYBOARD</kbd>, a pad picks a note in the scale (hold several for more
     than one), and the screen shows the piano roll;
   - in <kbd>CHORDS</kbd>, a pad picks its chord.
2. **Press a display button** to put that step in, or take it out.
3. **Hold a step's button and turn knobs 1–4** to change its Position, Pitch, Velocity
   and Length. In Keyboard and Chords mode, knobs 5–8 set the root, scale or chord
   type, and which pitches the screen shows.
4. <kbd>◀</kbd> and <kbd>▶</kbd> move eight steps at a time.

<kbd>SHIFT</kbd> + <kbd>STEP</kbd> again goes back. The usual Step mode
(<kbd>STEP</kbd> on its own) works as the MK3 manual says.

## AUTO is a switch

In Maschine, <kbd>AUTO</kbd> writes automation while you hold it. In DECKARD one press
switches Auto-write on and the next switches it off, with or without
<kbd>SHIFT</kbd>. While it's on, turning knobs 1–8 records their movement into the
playing pattern. Holding still works too: hold <kbd>AUTO</kbd>, turn a knob, and
Auto-write goes off again when you let go.

- <kbd>ERASE</kbd> + **knob** removes that knob's automation.
- <kbd>SHIFT</kbd> + **pad 10** (Clear Auto) removes the focused sound's automation in
  the focused pattern.

## Loops on their pads

In <kbd>PAD MODE</kbd>, a sound's pad shows and controls the loop it plays.

- **An Audio plug-in in Loop mode** plays with the pattern, not with notes. Its pad
  switches the loop on or off in the pattern the group is playing, as a step pad does.
  It also picks the sound, as any pad does. With <kbd>ERASE</kbd>, <kbd>SELECT</kbd>,
  <kbd>MUTE</kbd> or <kbd>SOLO</kbd> held, the pad does what those buttons say instead.
- **A pad stays fully lit while its loop plays**, on the pad and in the pad grid on the
  screen, even after you let go. That's an Audio plug-in's loop that's on in the
  playing pattern, or a Sampler zone looping with a sustaining envelope until its note
  is released or choked. When the loop stops, the pad goes back to its usual light.

The JAM's pads do the same in its Pad view.

## Pad Touch on the Keyboard page

<kbd>KEYBOARD</kbd>'s knob pages have two more pages at the end. Page through with
<kbd>◀</kbd> and <kbd>▶</kbd>:

- **Pad Touch:** Mode (Velocity, Poly AT, Aftertouch or CC), Curve, Min and Max.
- **Pad Touch CC:** the controller number, for CC mode.

These are the focused sound's settings. They decide whether pad pressure is recorded;
see [Pad pressure on the MK3](/software/deckard/manual/expression#pad-pressure-on-the-mk3).

## The Groove pages

A sound's **Groove** pages (Swing, Variation and Generate) work as the MK3 manual says,
with these differences.

- **The last Groove page you used comes back.** <kbd>VARIATION</kbd>, or choosing
  **Groove** again, opens the page you left, for every sound. Switching sounds, or
  between <kbd>PAD MODE</kbd> and <kbd>KEYBOARD</kbd>, keeps it.
- **The right screen shows what Generate writes.** It follows the **Mode** knob.

### Euclidean

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-euclidean.png" alt="The MK3's two screens on the Generate page in Euclidean mode. The right screen shows a circle of eight dots with 5 over 8 in the middle, cyan arcs on the five hits, an amber hand pointing at the third step, and ROTATE 0 below. The knobs read Mode Euclidean, Steps 8, Fills 5, Rotate 0, Division 1/16, Root Note C3 and Live Off." loading="lazy" />
  <figcaption>Euclidean mode: five fills over eight steps, with the hand on the step playing.</figcaption>
</figure>

- **The circle** has a dot for each step, with the first step at the top. Each hit has
  an arc along the rim as long as its step. The middle shows Fills over Steps.
- **Rotate** turns the hits around the circle. The circle only changes when you turn
  Steps, Fills or Rotate.
- **The hand** shows where the pattern is playing, and the step under it lights.
- **Knob 6, Root (Note),** sets the note Generate writes. It's the sound's **Base
  Key**, the pitch its pad plays, so it's saved with the project and changes the pad
  too. With **Live** on, the pattern is written again as you turn it. To make a
  melody, generate the rhythm on one note, then move notes up and down in the
  pattern.

### Random

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-random.png" alt="The MK3's two screens on the Generate page in Random mode. The right screen shows a piano roll from C3 to C4 with ten cyan notes over a bar, an amber playhead with the note under it lit, 55 % · 10 notes at the top, and a small Velocity Natural curve in the corner. The knobs read Mode Random, Probability 55 %, Velocity 10 %, Note Lo C3, Note Hi C4, Note Count 1 and Distribution Natural." loading="lazy" />
  <figcaption>Random mode: the generated notes over the note range, with the playhead.</figcaption>
</figure>

- **The roll** shows the focused pattern's notes over the **Note Lo** to **Note Hi**
  range, with a line on each beat and bar. Louder notes are brighter.
- **The playhead** moves with the song, and the notes under it light.
- **The top line** shows Probability and how many notes there are. The corner shows
  the Velocity distribution's curve.

## Ratchets on the Step and Events pages

<kbd>STEP</kbd> and <kbd>EVENTS</kbd> have a second knob page for the selected notes.
Press <kbd>▶</kbd> to open it and <kbd>◀</kbd> to go back.

<figure class="screenshot">
  <img src="/manual/screenshots/mk3-ratchet.png" alt="The MK3's two screens on the Step page's second knob page. The selected note on the left screen, and again larger on the right, is split by three thin lines into four hits. The knobs read Probability 100 %, Ratchet 4, Shape Down and Floor 20." loading="lazy" />
  <figcaption>The Step page's second knob page, with a four-hit ratchet selected.</figcaption>
</figure>

| Knob | Sets |
| --- | --- |
| 1 **Probability** | The notes' chance of playing, as before. |
| 2 **Ratchet** | How many times each note plays inside its length, 1 to 16. |
| 3 **Shape** | **Flat**, **Down** or **Up**. |
| 4 **Floor** / **Ceiling** | Where the velocity is heading: **Floor** for falling notes, **Ceiling** for rising ones. |

- Knob 4 is named after the notes you've selected. With falling and rising notes
  selected together it reads **Target**, and moves each note's own Floor or Ceiling.
  With only Flat notes selected, knob 4 is empty.
- Both screens draw a thin line across a note for each hit after the first.
- The step grid (<kbd>SHIFT</kbd> + <kbd>STEP</kbd>) has no second knob page, so set
  ratchets from <kbd>STEP</kbd> or <kbd>EVENTS</kbd>.

[Ratchets](/software/deckard/manual/differences-from-maschine#ratchets) explains what
each setting does.

## Macros

<kbd>SHIFT</kbd> + <kbd>MACRO</kbd> opens Set Macro, as in Maschine: touch a knob to
make it a macro. In DECKARD you can also turn the knob pages with <kbd>◀</kbd> and
<kbd>▶</kbd> while Set Macro is open, and <kbd>MACRO</kbd> leaves it. A small macro
icon marks the knobs a macro controls.
