---
title: Sampler Preview
order: 13
description: A sampler that finds a sample's tempo and key, keeps it in time with the song, splits it into stems and chops it into slices that each play their own way.
maschine: ['“Sampling and sample mapping” in the Maschine 3 Software Manual']
preview: Only in the next release.
---

Sampler Preview is a second sampler beside Maschine's. It does what the Sampler does,
and it also listens to what you load: it finds the sample's tempo and key, plays it in
time with the song without changing its pitch, separates it into stems, and lets every
slice play in its own way, or layers several samples into one sound. It's edited in the
Sampling view, on the same **RECORD**, **EDIT**, **SLICE** and **ZONE** tabs as the
Sampler and a **LAYERS** tab of its own, and on the Maschine MK3's <kbd>SAMPLING</kbd>
page.

Everything below is DECKARD's own. For recording, the edit functions and zones, which
work as they do in Maschine, see NI's manual.

<aside class="callout warning" role="note">
  <p class="callout-title">Maschine doesn't read these settings</p>
  <p>A Sampler Preview's tempo, key, stems and per-slice settings are saved in a part of the project only DECKARD reads. Maschine opens the sound as a plain Sampler, and loses the rest if it saves the project. See <a href="/software/deckard/manual/differences-from-maschine#files-and-maschine">Files and Maschine</a>.</p>
</aside>

## Loading a sample

1. Add a **Sampler Preview** to a sound.
2. Drop a loop, a one-shot or a whole song on it (WAV or MP3).

Within a second or two the **EDIT** tab shows what it found:

```
97.71 BPM · 20.75 beats · Key E min · Root E3
```

A Sampler you already have converts with the **TO SAMPLER PREVIEW** edit function, and back
with **TO SAMPLER**.

## Tempo

**BPM** is the sample's own tempo and **BEATS** its length at that tempo. They move
together: change one and the other follows.

- Drag **BPM** to correct the tempo (<kbd>Shift</kbd>: finer).
- Drag **BEATS** to fit the sample to whole beats. A loop that reads 8.6 beats and should
  be two bars: drag it to 8, and its tempo follows.
- **SET PROJECT BPM**, or a right-click on **BPM**, sets the song's tempo to the
  sample's.
- **REANALYZE** finds the tempo and root again, from the part you've selected or else
  the part the zone plays.

### In time with the song

The mode buttons choose how the sample follows the song:

<div class="split">

| Mode | What it does |
|------|--------------|
| **REPITCH** | Plays like a Sampler: a higher key is faster and higher. |
| **SYNC** | Stays in time with the song at its own pitch, whatever the song's tempo. |
| **KEYS** | Stays in time as **SYNC** does, and the keys change its pitch without changing its speed. |

</div>

**SYNC** and **KEYS** need a tempo: set **BPM** by hand if none was found. The sample is
stretched as it plays, so you can change the song's tempo while it sounds. **START**
chooses the grid that notes played while the song runs start on.

## Key and root

**ROOT** is the key that plays the sample at its recorded pitch. A single note, such as
a bass hit, shows the note it is. A loop or a song has no single note, so DECKARD finds
its key and uses the key's first note as the root. The readout then names both:
`Key E min · Root E3`.

- A question mark (`Key E min? · Root E3?`) means no key stood out and this is the
  likeliest. Check it by ear.
- Drag **ROOT** to set it yourself. A root you set is left alone by **REANALYZE**.
- **PLAYS AT** is the note the sample sounds at now, and **MATCH KEY** tunes it to the
  nearest note of the song's key.

Where two keys fit a mix nearly alike, DECKARD listens to the bass to choose between
them. It hears the bass better once the sample has stems: a root that was missing or a
guess is found again when the stems are made.

## Stems

**STEMS** separates the sample into four lanes: **Drums**, **Vocals**, **Bass** and
**Leads**. The lanes show under the waveform, each with **M** (mute), **S** (solo) and
a level. They stay in time with the sample in every mode, and mutes can be set per
slice: a lane muted on one slice still plays on the others.

Separating needs the stem model, which is installed separately. You can also drop your
own stem files onto the lanes.

### What one stem has

Right-click a lane's name:

- **Root from this stem** sets the zone's root as that stem alone has it. The bass is
  usually the one to ask.
- **Tempo from this stem** sets the zone's tempo from it. The drums are usually the one
  to ask.
- **Analyse from this stem** sets both.

## Slices

On the **SLICE** tab, **MODE** chooses how the sample is cut. **Split**, **Grid**,
**Detect** and **Manual** are Maschine's. Two are new:

- **Find** looks for the places where something comes in, on the sample's bars and beats
  when it has a tempo. **SAMPLES** is how many to find.
- **Random** picks that many at random among the places **Find** weighs. **RE-ROLL**
  picks again.

Right-click a slice and choose **Keep slice**: a kept slice stays where it is when the
others are found or picked again.

### Chopping while it plays

In **Manual**, play the sample and press **CUE**: a slice lands at the playhead, on the
sample's nearest eighth note when it has a tempo.

### Where the slices go

**APPLY…** offers up to 64 slices. **TO** chooses **Keys** (every slice on a key of
this sound) or **Pads** (every slice a sound of its own, on the pads of new groups, 16
to a group). **ORDER** can shuffle them, and the slices can be exported as files
instead.

**Key Shift**, in a slice's right-click menu, puts that slice on the group's next empty
sound over all its keys, to play in keyboard mode.

### How a slice plays

On **EDIT**, with a slice focused:

<div class="split">

| Setting | What it does |
|---------|--------------|
| **PLAYS** | **Hold** plays while the pad is held. **One shot** plays through to its end on a tap. **Loop** goes round while the pad is held. |
| **REVERSE** | Plays the slice backwards. |
| **SPEED** | How fast it goes against the song, its pitch unmoved: 50 % is half speed, 200 % double. |
| **TAIL** | For a slice that ends abruptly: at its end it plays back from there for this long, fading out. |

</div>

**MOTION** is for the whole sound. With **Next**, every note plays the next of the
sound's slices, whichever key it is; with **Random**, any but the one before.

**MUNGE**, among the edit functions, rebuilds the sample from its own parts with
**SWING**, **GRUNGE** and **COMB**. It needs the sample's tempo.

## Layers

A Sampler Preview sound can play up to eight samples at once, each a **layer**. Every note
plays all of them, over the same keys, and **Morph** fades from one to the next as the
note sounds. A sound with layers has no slices, and a sliced sound has no layers.

Open the **LAYERS** tab of the Sampling view. It's there for a Sampler Preview that isn't
sliced, even an empty one.

- Drop samples on the lanes: on an empty lane they become new layers, on a layer they
  replace its sample and keep its settings. **+ LAYER** opens a file chooser instead.
- DECKARD listens for each sample's root as it lands, so the layers play in tune with
  each other.
- Click a layer's name to edit it. Drag the name up or down to move the layer.
  Right-click it for **Duplicate layer** and **Remove layer**.
- **M** mutes a layer and **S** solos it. Drag the level at the right of its lane.

The first time a sound gets layers, a One-shot amp envelope becomes an ADSR, so the
layers sound for as long as you hold the note.

### A layer's settings

<div class="split">

| Setting | What it does |
|---------|--------------|
| **LEVEL**, **PAN** | The layer's volume and place in the stereo field. |
| **TUNE**, **ROOT** | Its tuning in semitones, and the key that plays it at its recorded pitch. |
| **ATTACK**, **DECAY**, **SUSTAIN**, **RELEASE** | The layer's own envelope, on top of the sound's amp envelope. A slow attack on one layer lets it swell in under the others. |

</div>

**KEYS** (**LOW** and **HIGH**) is the range of keys the whole sound plays on.

### Morph

The strip above the lanes shows where each layer is heard as the morph moves from left
to right: its **window**. A layer fades in from **A** to **B**, is at full level from
**B** to **C**, and fades out from **C** to **D**. The white line is where the morph is
now. With **Morph** off, every layer plays at its level all the time.

<div class="split">

| Setting | What it does |
|---------|--------------|
| **ON** | Switches the morph on. |
| **POSITION** | Where the morph starts from. |
| **RATE**, **SYNC** | How long one pass takes: 0.05 to 500 seconds, or with **SYNC** on, 1/16 of a bar to 64 bars of the song. |
| **SHAPE** | **Round** goes through the layers and wraps to the first again. **There and back** goes to the end and returns. |
| **DEPTH** | How far **There and back** travels. **Round** always goes all the way. |
| **RESET** | On, every note starts its own pass from **POSITION**. Off, all notes share one pass, which follows the song when synced. |
| **FADE** | **Linear**, or **Equal power**, which keeps the loudness even where two unlike sounds cross. |
| **WINDOWS** | **Even** while the windows are spread evenly over the layers. Drag one of the focused layer's four points on the strip to set a window by hand; click **WINDOWS** to spread them evenly again. |

</div>

**MORPH** is also a destination in [the mod matrix](/software/deckard/manual/modulation#the-mod-matrix),
so an LFO, the mod wheel or pressure can move through the layers.

## Dragging a sample out

On macOS you can drag what you hear into another application: a sampler plug-in, an
audio track, the Finder.

- Drag the **DRAG** grip beside the sample's name for the sample.
- Drag a stem lane's name for that stem.

You get the part selected, or else the part the zone plays, as a WAV file. Hold
<kbd>Alt</kbd> while dragging for the whole file.

## On the Maschine MK3

Press <kbd>SAMPLING</kbd> and choose **EDIT**. The <kbd>◀</kbd> and <kbd>▶</kbd> page
buttons go through Sampler Preview's knob pages.

<div class="split">

| Page | Knobs |
|------|-------|
| **TEMPO / PITCH** | **MODE**, **BPM**, **BEATS**, **ROOT** |
| **PLAYBACK** | **SPEED**, **REVERSE**, **PLAYS**, **LOOP LENGTH**, **KEY** |
| **TAIL / MOTION** | **TAIL**, **MOTION** |
| **SYNC** | **START** |
| **STEMS** | The lanes' levels. Display buttons 5 to 8 mute them; with <kbd>SHIFT</kbd> they solo. |

</div>

### Fitting a loop to whole bars

**BEATS** shows the sample's length at its tempo: `8.60`, or `8 (2 bars)` when it's
whole bars. Turn it and the length goes to the next whole beat that way, the tempo
following. For a loop that should be two bars and reads `8.60`, one step down makes it
`8 (2 bars)`.

**ROOT** shows the key with the root when it has one: `E3 min`, or `E3 min?` for a
guess.

### Analysing

- Display button 7, **ANALYZE**, finds the tempo and root again, as **REANALYZE** does.
- With <kbd>SHIFT</kbd> held, display buttons 5 to 8 are **X2**, **1/2**, **TO PROJECT**
  and **MATCH KEY**.
- A zone with stems has three more edit functions, reached with display buttons 5 and
  6: **STEM ROOT**, **STEM TEMPO** and **STEM ANALYZE**. Display button 7 then shows the
  stem that will be used and goes round the zone's stems; **APPLY** sets the root, the
  tempo or both from that stem alone.

### Layers

On a sound with layers, press display button 4 again to go from **ZONE** to **LAYERS**,
and once more to go back. The left display shows the layers' windows and where the
morph is, the right display the layers. The pads still play the sounds. Samples are
added to layers in the software.

- Knob 7 picks the layer. Knob 8 is always its **LEVEL**.
- Display buttons 5 to 8 mute the four layers shown. With <kbd>SHIFT</kbd> they solo.
- <kbd>SHIFT</kbd> + display button 1 is **REMOVE** (the focused layer), and
  <kbd>SHIFT</kbd> + display button 2 is **SPREAD** (the windows spread evenly again).

<div class="split">

| Page | Knobs |
|------|-------|
| **LAYER** | **PAN**, **TUNE**, **ROOT** |
| **ENVELOPE** | **ATTACK**, **DECAY**, **SUSTAIN**, **RELEASE** |
| **MORPH** | **MORPH**, **POSITION**, **RATE**, **SHAPE**, **DEPTH**, **RESET** |
| **WINDOW** | **A**, **B**, **C**, **D**, **FADE** |

</div>

**RATE** is one knob: it turns through the synced lengths, then the free ones.

### Slicing

On **SLICE**, in **Manual**, an empty pad pressed while the sample plays drops a slice
at the playhead. With <kbd>SHIFT</kbd> held, the display buttons are **KEY SHIFT**,
**RE-ROLL** (in **Random**), **BANK** (the pads' next sixteen slices) and **KEEP** (in
**Find** and **Random**).
