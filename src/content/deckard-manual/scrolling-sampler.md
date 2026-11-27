---
title: Scrolling sampler
order: 14
description: Keep the recent master output in a rolling buffer, select a take, and drag it onto a sound.
preview: Only in the next release.
---

The scrolling sampler keeps the recent master output in memory while you work. It is
useful for grabbing something you just played without having to start a recording first.
It is off by default.

## Set it up

Open **Preferences ▸ Audio** and tick **Capture recent master output** under
**Scrolling sampler**.

<figure class="screenshot">
  <img src="/manual/screenshots/scrolling-sampler-settings.png" alt="Preferences ▸ Audio showing the Scrolling sampler settings: Capture recent master output is enabled, the buffer is 300 seconds, the waveform colour is Theme, selection cleanup is enabled, Fade to zero crossing is enabled with a 5 ms duration, and Dropped selection instrument is set to Audio." loading="lazy" />
  <figcaption>The scrolling sampler settings in Preferences ▸ Audio.</figcaption>
</figure>

- **Buffer** keeps the last 30, 60, 120, 300 or 600 seconds of the master output.
- **Waveform colour** chooses the theme colour, a custom colour, or a rainbow across the
  waveform.
- **Remove leading and trailing silence** trims silence from a selection before it is
  loaded.
- **Fade to zero crossing** adds a short fade at the selection's ends to avoid clicks.
  Choose a duration from 1 to 10 ms, or turn the option off.
- **Dropped selection instrument** chooses whether a selection dragged onto a sound becomes
  an **Audio** loop or a new **Sampler** take. This choice is remembered.

The capture is temporary: DECKARD removes its scrolling-sampler files when it quits. It
does not replace the normal browser drag-and-drop behaviour for samples.

## Find and select a take

The scrolling sampler appears as a narrow waveform strip above the main work area. The
waveform follows the live edge as audio arrives.

- Scroll over the waveform to move backwards and forwards through the buffer.
- Hold <kbd>Shift</kbd> while scrolling to zoom in or out. The view can show from one
  second up to the whole buffer.
- Hold <kbd>Ctrl</kbd> and click the waveform to pause or resume capture.
- Drag across the waveform to select the part you want. Drag either selection edge to
  resize it.

The selected audio is exported only after the selection or resize gesture finishes. The
same selection is then reused if you drag it again, so repeated drops do not create a
growing collection of duplicate files. A completely silent selection is ignored.

## Drop the selection

Drag inside the highlighted selection, then release it over a sound slot.

<figure class="screenshot">
  <img src="/manual/screenshots/scrolling-sampler-drag-to-sound-slot.png" alt="The scrolling sampler at the bottom of the DECKARD window with a highlighted waveform selection being dragged toward the sound 1 slot in the sound list." loading="lazy" />
  <figcaption>Drag the highlighted selection onto a sound slot.</figcaption>
</figure>

With **Dropped selection instrument** set to **Audio**, DECKARD makes the sound an Audio
plug-in and loads the selection as a loop. Its length is calculated from the exact sample
duration and the project's tempo, so the loop keeps the selected timing rather than being
rounded to a conventional beat length. If the sound already has an Audio plug-in, the
selection is added as another take.

With it set to **Sampler**, DECKARD adds the selection as a new Sampler zone, preserving
the normal Sampler loading behaviour.
