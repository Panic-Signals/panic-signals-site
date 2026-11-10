---
title: DECKARD's own synths
order: 9
description: Replicant, a classic subtractive synth with a supersaw, and Plaits, Mutable Instruments' macro-oscillator.
---

Besides its versions of Maschine's instruments, DECKARD has two synths of its own. Add
them from the **+** at the end of any chain: **Internal ▸ Replicant** or
**Internal ▸ Plaits**. Both work as mod-matrix targets.

## Replicant

<figure class="screenshot">
  <img src="/manual/screenshots/replicant.png" alt="Replicant's controls in the Control area: oscillators, filter, envelopes and modulation." loading="lazy" />
  <figcaption>Replicant.</figcaption>
</figure>

Replicant is a classic subtractive synth. Its pages are **Oscillators**, **Filter**,
**Amp**, **Modulation** and **Super**.

| Page | What's on it |
| --- | --- |
| **Oscillators** | Two oscillators (saw, pulse, triangle or sine), a sub oscillator and noise. |
| **Filter** | A resonant low-pass, band-pass or high-pass filter, with its own envelope. |
| **Amp** | The amp envelope. 16 voices, or Mono with glide. Stereo spread and analog-style drift. |
| **Modulation** | An LFO to pitch and cutoff, and vibrato on the mod wheel. |
| **Super** | Turns oscillator 1 into a JP-8000-style supersaw: up to seven detuned copies, their detune and their mix. |

## Plaits

<figure class="screenshot">
  <img src="/manual/screenshots/plaits.png" alt="Plaits' controls in the Control area: engine, Harmonics, Timbre and Morph, and the envelope." loading="lazy" />
  <figcaption>Plaits.</figcaption>
</figure>

Plaits is Mutable Instruments' macro-oscillator module, built from Émilie Gillet's
open-source code, so it sounds like the module.

- **Engines:** all 24, including virtual analogue, waveshaping, FM, grains, additive,
  wavetables, chords, speech, strings, modal resonators and the drum models.
- **Harmonics, Timbre and Morph** take the names the module's manual gives them for
  the engine chosen. Virtual Analog, for example, shows Detune, Square and Saw.
- **Envelope:** the module's low-pass gate (Decay and Colour), or a plain gate with a
  Release.
- **Voices:** 1, 2, 4 or 8.

Plaits' code is © Emilie Gillet, used under the MIT licence, shown in DECKARD's About
box.

## Zhora

DECKARD's third instrument, **Zhora**, doesn't make a sound of its own. It plays a
modular synth over CV and keeps it in tune. It has its own chapter:
[Controlling modular synths](/software/deckard/manual/modular-synths#zhora).

## In Maschine

Replicant and Plaits are saved in the project like plug-ins. Maschine can't play them
and reports them as missing plug-ins, but keeps their settings when it saves the
project, so they come back when you open it in DECKARD again.
