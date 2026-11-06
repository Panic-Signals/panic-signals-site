# Shows

One file per show. Name it `YYYY-MM-DD-venue.md` so they sort nicely (the name isn't shown anywhere).

```markdown
---
date: 2026-12-12            # required, exactly YYYY-MM-DD
city: Chicago, IL           # required
venue: The Empty Bottle     # required
tickets: https://...        # optional ticket link
doors: 8:00 PM              # optional
---

Optional notes, e.g. "with special guests".
```

- Past shows disappear from the site by themselves (the site rebuilds every night). You can
  delete old files whenever you like.
- If a date is written wrong, the site won't publish and the GitHub Actions log says which
  file and why.
- The timezone used to decide "past" is `timezone` in `site.config.yaml`.
