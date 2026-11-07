---
title: EPS16+ Wavesample Utility
summary: Send WAV files to an Ensoniq EPS16+ sampler, and get its samples back, from your web browser over MIDI.
repo: https://github.com/summitt/EnsoniqEPS16Plus
app: https://summitt.github.io/EnsoniqEPS16Plus/
status: Runs in your browser
order: 2
---

The Ensoniq EPS16+ is a 1990s sampling synthesizer. The old tools for getting samples
in and out of it don't run on today's computers, such as Apple Silicon Macs, or are
command-line programs that break your flow when you're working on a song.

This utility runs in your web browser. It talks to the EPS16+ over MIDI, using the
browser's Web MIDI support, so there's nothing to install and it works on macOS,
Windows and Linux.

## What you need

- An Ensoniq EPS16+.
- A MIDI interface connected to the EPS16+'s MIDI in and MIDI out.
- A browser with Web MIDI, such as Chrome or Edge. Allow MIDI access when the page asks.

## Sending a sample to the EPS16+

1. Make sure the EPS16+ has an instrument, a layer and a wavesample to load into. The
   utility's functions can make them for you; a new wavesample starts as the EPS16+'s
   default square wave.
2. Drag a **mono** WAV file onto **Drag WAV File Here**. The utility draws its waveform.
3. Click **Upload to EPS16+**. Large files take a while.

The [video tutorial](https://youtu.be/-471osvR67s) walks through it.

## If something goes wrong

If the EPS16+ starts answering with NAK messages, refresh the page and try again.
Report other problems on [GitHub](https://github.com/summitt/EnsoniqEPS16Plus/issues).
