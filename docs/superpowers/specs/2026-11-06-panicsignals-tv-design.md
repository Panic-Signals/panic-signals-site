# panicsignals.tv — Site Design

Date: 2026-11-06
Status: approved by owner 2026-11-06 (Phase 1); Phase 2 pending

## Phasing (decided 2026-11-06)

**Phase 1 (build now): the band site, plus a Deckard placeholder.** This covers the
intro, band sections, shows, booking form, the software list and a static
`/software/deckard` placeholder page (short description, link to the GitHub repo and
releases, "manual coming soon"). Phase 1 does **not** touch the Deckard repo and does
not fetch anything from it. The owner is working on a Deckard branch.

**Phase 2 (later): the Deckard manual and updates pipeline.** These questions are open
and must be answered before Phase 2 is planned:

1. **Contents of `manual/`.** Most of `docs/` is *not* user-facing. The fx-*/synth-*
   pages are clean-room reverse-engineering specs citing NI internals and decompiler
   output, and recording-/channel-manual quote NI's manual. They must not be
   published. Claude recommends seeding `manual/` by splitting the README's user
   sections (Getting DECKARD, A tour, Recording, Modulation, Custom themes,
   Launchpad Pro MK3, DECKARD's own synths) into about 7 pages.
2. **Which Deckard version the manual tracks:** `main` or the latest release tag.
   Claude leans toward the latest release.

The Phase 2 sections below ("Deckard `manual/` folder", manual/updates goals) describe
direction only and are superseded by the answers to these questions.

## Intent

panicsignals.tv is the home of **Panic Signals**, an industrial / goth / IDM / glitch band,
and of the band's software projects, the first being **DECKARD** (a Maschine-style
groovebox written in Rust, repo `Panic-Signals/Deckard`).

The band side should feel like switching on an old CRT and catching a scrambled,
haunted transmission, in the spirit of an unsubscribed pay-per-view channel or
*Poltergeist*: static, scan lines, glitch, and something pushing through the glass at
you. Then it opens into the band's story, shows and a booking form.

The software side is where people go to learn, download and look things up. It keeps
the Panic Signals identity but must be calm and readable, because people read manuals
there.

The owner edits content as Markdown files on GitHub. The site must be hostable on
GitHub Pages at the custom domain `panicsignals.tv`.

## Goals

1. A CRT-style intro on the home page: static that "something" pushes through, then a
   flash that leaves the PANIC SIGNALS wordmark, leading into the band content.
2. Band content: who we are, where we're from, our sound, our vision. All placeholder
   (lorem ipsum) for now, in Markdown files the owner will rewrite.
3. A list of upcoming shows, where each show is one small Markdown file.
4. A booking/contact form that emails the owner, via Formspree.
5. A Software section that lists projects. DECKARD is the first project and gets:
   - **Overview**: what it is, features, screenshots, downloads, sponsor links.
   - **Manual**: pulled automatically from the `manual/` folder of the Deckard repo,
     with sidebar navigation and search.
   - **Updates**: release notes pulled automatically from GitHub Releases of
     `Panic-Signals/Deckard`.
6. Everything editable by changing Markdown or image files on GitHub. No CMS server
   and no database.

## Non-goals (for now)

- Choosing the actual image(s) that push through the static. The owner will add PNGs
  later. The site just has to make that easy.
- Real band copy, photos and music embeds. Placeholders only.
- Merch, mailing list, accounts, comments.
- A content-editing UI. Editing on GitHub is fine.

## Anti-goals (would be a failure even if it "works")

- A generic dark band template. The CRT/haunted-transmission feel is the point.
- An intro that's annoying: it plays every time someone navigates home, it can't be
  skipped, or it hides content from search engines and screen readers.
- A manual that's hard to read because the glitch styling bleeds into it.
- Two copies of the Deckard manual that drift apart.
- Putting any secret (SendGrid key etc.) in the browser.

## Constraints

- **Hosting:** GitHub Pages, custom domain `panicsignals.tv` (needs a `CNAME` file plus
  DNS records at the registrar: apex A/AAAA records to GitHub Pages, and HTTPS enforced).
- **Static only:** no server. Anything dynamic happens at build time or through a
  third-party service (Formspree).
- **Deckard repo is public** (`Panic-Signals/Deckard`, default branch to confirm) and
  already publishes releases (0.1.0 → 0.4.1 as of today).
- **Accessibility:** respect `prefers-reduced-motion` (no flashing; a gentle fade
  instead). Real text in the HTML, not only canvas or images.

## Decisions made with the owner

- **Intro:** direction "C: something in the static". Snow, then an image fades in
  blurred, grows, trembles against the glass, white flash, and the PANIC SIGNALS
  wordmark is left behind with RGB-split glitch. Mockups explored a hand, face, eye,
  silhouette and waveform. The owner chose to defer the subject.
- **The "something" (the apparition) can be an image or a video.**
  - *Images:* PNG (transparent recommended), plus GIF/WebP. Drop the file into the
    apparitions folder and it's in the rotation.
  - *Videos:* either a video file in the folder or a **link to a hosted video file**
    (URL to an .mp4/.webm) listed in the settings file. Videos play muted, inline and
    looped/once under the same static, blur, tremble and flash treatment. For a cut-out
    (transparent) look, use WebM with alpha plus an HEVC-with-alpha .mov fallback for
    Safari. Opaque video works too and reads as "a transmission breaking through".
  - *Claude's call:* YouTube/Vimeo page links are **not** supported in the intro.
    They render inside an iframe with their own player chrome and can't be blurred,
    masked or timed with the effect. Direct video file URLs are required.
  - The settings file can pin one apparition (image, file or URL). Otherwise one is
    picked at random per visit. Phones on data-saver / reduced motion get the image
    path (or the video's poster frame) instead of the video.
- **Content is Markdown on GitHub.** The owner is comfortable with that.
- **Deckard manual source:** a new `manual/` folder in the Deckard repo, holding only
  user-facing pages. The site pulls it automatically. Developer notes in `docs/` are
  not published.
- **Booking form:** Formspree for now. Its endpoint is a single config value, so it can
  later move to e.g. a Cloudflare Worker + SendGrid without touching the form.
- **Band copy:** lorem ipsum placeholders for now.
- **Typography:** band pages use Courier / monospaced fonts throughout for a terminal
  feel (headings, body, nav, shows, form). The Deckard / software pages do *not* go
  all-mono: readable proportional body type, with monospace kept for the wordmark,
  code, keyboard shortcuts and small accents.

## Claude's calls (owner can override)

- **Static site generator: Astro**, deployed by a GitHub Actions workflow to Pages.
  Reasons: first-class Markdown "content collections" with schema checks (a malformed
  show file fails the build with a clear message instead of silently vanishing),
  zero-JS-by-default pages with small islands for the intro and search, and easy
  build-time fetching of another repo and the GitHub Releases API. Jekyll would be
  native to Pages, but pulling the Deckard repo needs an Actions build anyway, which
  removes Jekyll's main advantage.
- **Manual search:** Pagefind (static, build-time index, no service).
- **Random apparition:** if several PNGs are present, one is picked at random per
  visit. `site.config` (or a small YAML/JSON settings file) can pin one by filename.
- **Intro plays once per browser session**, with a visible "skip" control; any key,
  click or scroll also skips. Returning to home in the same session shows the end state.
- **Shows:** one Markdown file per show with front matter (date, city, venue, ticket
  link, optional notes). Shows whose date has passed drop off the upcoming list
  automatically, so the site needs a scheduled rebuild (see below). No "past shows"
  archive for now.
- **Rebuild triggers:** on push to the site repo; on a nightly schedule (keeps shows
  current and picks up Deckard changes); and on demand via `workflow_dispatch`.
  Optionally the Deckard repo can send a `repository_dispatch` when `manual/` changes
  or a release is published. That needs a token secret and is a nice-to-have, not
  required.
- **Two visual modes:** band pages are dark, glitchy and CRT-styled. Software pages use
  the same palette and wordmark with the effects turned off: readable body type and
  normal contrast.
- **Software section is a list**, so later projects (e.g. the EPS16+ tool already in the
  Panic-Signals org) can be added as one folder each. Only DECKARD gets a manual and
  updates for now.
- **Deckard overview copy** starts from the existing Deckard README (features, "what you
  need", downloads, sponsors), lightly adapted. Download buttons link to the latest
  release assets fetched at build time.

## Site map

```
/                      Intro (CRT + apparition) → band story sections
/shows                 Upcoming shows (also summarised on home)
/booking               Booking form (also linked from home)
/software              List of software projects
/software/deckard      Overview
/software/deckard/manual/…   Manual pages (from Deckard repo manual/)
/software/deckard/updates    Release notes (from GitHub Releases)
```

## Content the owner edits (proposed layout)

```
src/content/band/          about.md, origin.md, sound.md, vision.md   (lorem ipsum)
src/content/shows/         2026-12-12-somewhere.md  (one per show; example included)
src/content/software/      deckard.md  (overview copy + metadata)
public/apparitions/        *.png / *.gif / *.webp / *.webm / *.mp4  (whatever pushes through the static)
site.config.*              formspree endpoint, linked apparition video URLs, pinned apparition, social links
```

Each folder gets a short README explaining how to add or edit an item.

## Deckard `manual/` folder (in the Deckard repo)

- *(Phase 2, see the open questions under Phasing.)* Lives at
  `Panic-Signals/Deckard/manual/`. Seed content is to be decided. Do **not** copy the
  fx-*/synth-*/recording-manual/channel-manual pages from `docs/`: they're
  reverse-engineering specs, not user docs.
- Ordering and grouping of the sidebar is defined by a small index file in `manual/`
  (or front matter), so the owner controls the menu from the Deckard repo.
- Images referenced by manual pages live in `manual/` (or reference
  `docs/screenshots/`); the build copies whatever the pages reference.
- Relative links between manual pages must keep working on the site.

## Left to the builder

- Exact visual design within the direction above (type, palette details, glitch
  techniques), following the CRT mockups explored in brainstorming.
- How the apparition effect is implemented (canvas/CSS/WebGL), provided it stays smooth
  on phones and degrades for reduced motion.
- Markdown rendering details for the manual (code blocks, tables, admonitions).
- Spam protection details on the form (Formspree honeypot field at minimum).
