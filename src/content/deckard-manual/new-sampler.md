---
title: The New Sampler
order: 13
description: A sampler that finds a sample's tempo and key, keeps it in time with the song, splits it into stems and chops it into slices that each play their own way.
maschine: ['“Sampling and sample mapping” in the Maschine 3 Software Manual']
preview: Only in the next release.
---

The New Sampler is a second sampler beside Maschine's. It does what the Sampler does,
and it also listens to what you load: it finds the sample's tempo and key, plays it in
time with the song without changing its pitch, separates it into stems, and lets every
slice play in its own way. It's edited in the Sampling view, on the same **RECORD**,
**EDIT**, **SLICE** and **ZONE** tabs as the Sampler, and on the Maschine MK3's
<kbd>SAMPLING</kbd> page.

Everything below is DECKARD's own. For recording, the edit functions and zones, which
work as they do in Maschine, see NI's manual.

<aside class="callout warning" role="note">
  <p class="callout-title">Maschine doesn't read these settings</p>
  <p>A New Sampler's tempo, key, stems and per-slice settings are saved in a part of the project only DECKARD reads. Maschine opens the sound as a plain Sampler, and loses the rest if it saves the project. See <a href="/software/deckard/manual/differences-from-maschine#files-and-maschine">Files and Maschine</a>.</p>
</aside>

## Loading a sample

1. Add a **New Sampler** to a sound.
2. Drop a loop, a one-shot or a whole song on it (WAV or MP3).

Within a second or two the **EDIT** tab shows what it found:

```
97.71 BPM · 20.75 beats · Key E min · Root E3
```

A Sampler you already have converts with the **TO NEW SAMPLER** edit function, and back
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

### Warp markers

For a sample whose timing drifts, **MARKERS** puts warp markers on its hits,
**QUANTIZE** moves them toward the **GRID** by **STRENGTH**, and **CLEAR** removes
them.

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

## Dragging a sample out

On macOS you can drag what you hear into another application: a sampler plug-in, an
audio track, the Finder.

- Drag the **DRAG** grip beside the sample's name for the sample.
- Drag a stem lane's name for that stem.

You get the part selected, or else the part the zone plays, as a WAV file. Hold
<kbd>Alt</kbd> while dragging for the whole file.

## On the Maschine MK3

Press <kbd>SAMPLING</kbd> and choose **EDIT**. The <kbd>◀</kbd> and <kbd>▶</kbd> page
buttons go through the New Sampler's knob pages.

<div class="split">

| Page | Knobs |
|------|-------|
| **TEMPO / PITCH** | **MODE**, **BPM**, **BEATS**, **ROOT** |
| **PLAYBACK** | **SPEED**, **REVERSE**, **PLAYS**, **LOOP LENGTH**, **KEY** |
| **TAIL / MOTION** | **TAIL**, **MOTION** |
| **SYNC** | **START** |
| **STEMS** | The lanes' levels. Display buttons 5 to 8 mute them; with <kbd>SHIFT</kbd> they solo. |
| **WARP** | **GRID**, **STRENGTH** |

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

### Slicing

On **SLICE**, in **Manual**, an empty pad pressed while the sample plays drops a slice
at the playhead. With <kbd>SHIFT</kbd> held, the display buttons are **KEY SHIFT**,
**RE-ROLL** (in **Random**), **BANK** (the pads' next sixteen slices) and **KEEP** (in
**Find** and **Random**).
