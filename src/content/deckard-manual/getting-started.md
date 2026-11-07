---
title: Getting started
order: 2
description: Install DECKARD, open your Maschine projects, and connect an MK3 or a Launchpad Pro.
---

## What you need

- **A computer** running macOS, Linux or Windows.
- **Speakers or headphones.** DECKARD plays through your system's audio output.
  Choose the device in **Preferences ▸ Audio**.
- **Optional: a Maschine MK3**, or a Maschine+ in controller mode. DECKARD drives its
  pads, buttons, knobs, lights and both screens itself, so Maschine doesn't need to be
  installed.
- **Optional: a Novation Launchpad Pro MK3**, connected over USB.
- **Optional: Maschine's libraries.** Maschine projects use samples, kits and
  expansions from NI's libraries. DECKARD finds the ones you have installed, but
  doesn't come with any. Without them you can still use your own samples and
  DECKARD's built-in instruments.

## Installing

Download the build for your system from the
[releases page](https://github.com/Panic-Signals/Deckard/releases).

| System | Download | Install |
| --- | --- | --- |
| macOS | `DECKARD-<version>-macos-universal.zip` (Apple Silicon and Intel) | Unzip it and move **DECKARD.app** to Applications. |
| Linux | the `.deb` or `.rpm` package | `sudo apt install ./deckard_<version>-1_amd64.deb` or `sudo dnf install ./deckard-<version>-1.x86_64.rpm`. The package also installs the menu entry, the `.mxprj` file type and the rule that lets you use the MK3 without root. |
| Windows | `DECKARD-<version>-windows-x64-setup.exe` | Run the installer. It needs no administrator approval. DECKARD isn't signed yet, so SmartScreen may ask you to confirm. |

The first time DECKARD starts, it offers to download the model that STEMS uses to split
samples (84 MB). You can also leave that until you first use STEMS.

### Updates

At launch DECKARD asks GitHub whether a newer release exists. When one does, a dot
appears on the DECKARD wordmark in the header. **Help ▸ About DECKARD** then shows an
**Update** button that downloads it, installs it the way yours was installed, and
restarts DECKARD. **Preferences ▸ General** turns the check off.

## Opening and saving projects

- **Open** with **File ▸ Open…**, **File ▸ Open Recent**, or by dragging a Maschine
  project (`.mxprj`) onto the window. Audio files dropped onto a sound load into it.
- **Save** with **File ▸ Save**. It writes a normal Maschine project. The first time
  you save over a file in a session, the previous version is kept beside it as
  `<name>.mxprj.bak`.
- **If DECKARD closes with unsaved changes**, it brings them back the next time it
  starts.
- **Export** with **File ▸ Export Audio…** (the song, or stems per group or per sound)
  and **File ▸ Export MIDI…**.

Projects saved by DECKARD open in Maschine 3, and Maschine projects open in DECKARD.

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

## Connecting a Maschine MK3

1. **Quit Maschine and NI's hardware agents** (NIHardwareAgent and
   NIHostIntegrationAgent). While they run, they hold on to the controller's screens.
   - On macOS, DECKARD offers to quit NIHostIntegrationAgent when it finds it holding
     them.
   - On Windows, NI's driver owns the screens, so DECKARD asks to switch just the
     screens to Windows' WinUSB driver (with administrator approval). Maschine can't
     use them until you give them back in **Preferences ▸ Hardware**.
2. **Plug in the MK3.** DECKARD finds it on its own.

The MK3 then works as described in the Maschine MK3 manual, with the changes in
[The Maschine MK3](/software/deckard/manual/maschine-mk3).

## Connecting a Launchpad Pro MK3

Plug it in over USB. DECKARD switches it to DAW mode and the status bar says
"Launchpad Pro [MK3] connected". When DECKARD quits, the Launchpad goes back to
standalone. See [The Launchpad Pro MK3](/software/deckard/manual/launchpad-pro-mk3).

## Sync with other apps

- **Ableton Link:** **LINK** in the header shares tempo and start/stop with other
  apps on your network.
- **MIDI clock:** **Preferences ▸ MIDI ▸ Sync** sends clock to, or follows clock from,
  the MIDI ports you choose.
