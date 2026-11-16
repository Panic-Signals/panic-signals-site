---
title: Getting started
order: 2
description: Install DECKARD, open your Maschine projects, and connect an MK3, a Maschine JAM or a Launchpad Pro.
---

## What you need

- **A computer** running macOS, Linux or Windows.
- **Speakers or headphones.** DECKARD plays through your system's audio output.
  Choose the device in **Preferences ▸ Audio**. On Windows, **Driver** there chooses
  between **WASAPI** and your audio interface's **ASIO** driver, for lower latency.
- **Optional: a Maschine MK3**, or a Maschine+ in controller mode. DECKARD drives its
  pads, buttons, knobs, lights and both screens itself, so Maschine doesn't need to be
  installed.
- **Optional: a Maschine JAM**, with or without an MK3.
- **Optional: a Novation Launchpad Pro MK3**, connected over USB.
- **Optional: Maschine's libraries.** Maschine projects use samples, kits and
  expansions from NI's libraries. DECKARD finds the ones you have installed, but
  doesn't come with any. Without them you can still use your own samples and
  DECKARD's built-in instruments. To browse sound packs you keep elsewhere, add their
  folders in **Preferences ▸ Library**: each is listed in the browser under Factory,
  named after its folder.

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
    <li>LFOs and envelopes, and the mod-matrix, MIDI CC and CV routes they drive;</li>
    <li>note expression: polyphonic aftertouch, MPE pressure, slide and pitch, and release velocity;</li>
    <li>ratchets: each note plays once again;</li>
    <li>each sound’s Pad Touch settings;</li>
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

## Connecting a Maschine JAM

Plug it in, with Maschine closed. The status bar says "Maschine JAM connected". On
Windows, DECKARD offers to stop NI's services first, because they fight it over the
JAM's lights. See [The Maschine JAM](/software/deckard/manual/maschine-jam).

## Connecting a Launchpad Pro MK3

Plug it in over USB. DECKARD switches it to DAW mode and the status bar says
"Launchpad Pro [MK3] connected". When DECKARD quits, the Launchpad goes back to
standalone. See [The Launchpad Pro MK3](/software/deckard/manual/launchpad-pro-mk3).

## Windows plug-ins on Linux

Many plug-ins, NI's among them, have no Linux versions. On Linux, DECKARD runs their
Windows versions through [Wine](https://www.winehq.org) and
[yabridge](https://github.com/robbert-vdh/yabridge). **Preferences ▸ Plug-ins:
Manager ▸ Windows plug-ins** shows what you have and installs what you don't.

1. **Install Wine:** press **Install Wine…**. It uses your distribution's packages
   (Debian, Ubuntu, Mint, Fedora or Arch) and asks for an administrator's password.
2. **Install yabridge:** press **Install yabridge**. It goes into your home folder.
3. **Install your plug-ins into Wine**, by running their Windows installers with
   `wine`. NI's plug-ins install through Native Access, run the same way.
4. **Press Sync now**, then rescan. The plug-ins appear in DECKARD's list like any
   others. With **Sync before each rescan** on, as it is to start with, a rescan
   alone does both.

- **Plug-in windows are X11 windows.** On a Wayland desktop they run through
  XWayland.
- **If a plug-in's window takes no clicks or typing,** your Wine is 9.22 or later and
  yabridge's last release doesn't work with it. Preferences says so beside the Wine
  version. Press **Install build tools…**, then **Build yabridge**, which takes a few
  minutes.
- **If a plug-in doesn't show up,**
  [Windows plug-ins on Linux: troubleshooting](https://github.com/Panic-Signals/Deckard/blob/main/docs/windows-plugins-troubleshooting.md)
  goes through each step.

## Sync with other apps

- **Ableton Link:** **LINK** in the header shares tempo and start/stop with other
  apps on your network.
- **MIDI clock:** **Preferences ▸ MIDI ▸ Sync** sends clock to, or follows clock from,
  the MIDI ports you choose.
