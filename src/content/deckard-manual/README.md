# DECKARD manual

One Markdown file per chapter, shown at `/software/deckard/manual/<file name>` and
numbered by `order`. Sections (`##`) and subsections (`###`) are numbered for you.

```markdown
---
title: Modulation
order: 6
description: One sentence, shown under the title and on the contents page.
maschine: ['the Maschine MK3 Manual']             # optional: what in NI's manuals this builds on
preview: Only in the next release.              # optional: for features not released yet
---

## A section

Write hardware buttons and keys as <kbd>SHIFT</kbd> + <kbd>SELECT</kbd>.

<figure>
  <img src="/manual/screenshots/lfos.png" alt="What the picture shows" />
  <figcaption>A short caption.</figcaption>
</figure>

> **Note:** a side remark.
```

- Screenshots go in `public/manual/screenshots/`.
- The controller diagrams in `public/manual/diagrams/` are drawn by
  `scripts/manual-diagrams.mjs`. Change that script and run
  `node scripts/manual-diagrams.mjs` rather than editing the SVGs by hand.
