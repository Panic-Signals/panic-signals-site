# Software projects

One file per project, listed on `/software` in `order`.

```markdown
---
title: DECKARD
summary: One sentence shown in the list.
repo: https://github.com/Panic-Signals/Deckard
status: Manual available
manual: /software/deckard/manual   # optional: the status links here
app: https://example.com/app        # optional: runs in the browser; the main button (and the status, with no manual) opens it
video: https://www.youtube.com/watch?v=BENUyHwMlmg   # optional: shown under the buttons
order: 1
---

Longer description shown on the project's page.
```

Each project gets a page at `/software/<file name>` on its own. DECKARD has a page of its
own (`src/pages/software/deckard.astro`) for its download buttons.
