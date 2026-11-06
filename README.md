# panicsignals.tv

The Panic Signals website: the band, shows, booking, and software (DECKARD).
It's a static [Astro](https://astro.build) site, published to GitHub Pages by GitHub
Actions every time `main` changes, and again every night.

## Editing content (on GitHub)

Open the file on GitHub, click the pencil, edit, and **Commit changes** to `main`. The
site updates in a minute or two. Watch it under the repo's **Actions** tab.

| What | Where |
| --- | --- |
| Band sections (about, origin, sound, vision) | `src/content/band/*.md` |
| Shows (one file per show) | `src/content/shows/*.md` |
| Software projects | `src/content/software/*.md` |
| What pushes through the static in the intro | `public/apparitions/` (drop images or videos in) |
| Settings: booking form, timezone, linked videos, social links | `site.config.yaml` |

Each folder has its own `README.md` with a copy-paste example.

- **Add a show:** copy the example in `src/content/shows/`, rename it
  `YYYY-MM-DD-venue.md`, and change the details. Past shows disappear by themselves.
- **Add an apparition:** upload a transparent PNG (or a video) to `public/apparitions/`.
  To always use one, set `apparitions.pinned` in `site.config.yaml`.
- **Nightly rebuild:** GitHub pauses scheduled runs if the repo has had no commits for 60
  days. Past shows are still hidden in visitors' browsers, but to restart the nightly
  rebuild go to **Actions → Deploy site → Enable workflow** (GitHub emails you when it
  pauses), or just commit any change.
- **If a commit breaks the build** (e.g. a badly written date), the site keeps showing the
  last good version. The failed run under **Actions** says which file and what's wrong.

## Booking form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) and a new form.
2. Copy its endpoint (`https://formspree.io/f/xxxxxxx`) into `formspreeEndpoint` in
   `site.config.yaml`.
3. In Formspree's form settings, restrict submissions to the domain `panicsignals.tv`.

Submissions are emailed to the address on your Formspree account. The form has a hidden
spam trap (`_gotcha`).

## Publishing setup (one time)

**GitHub Pages:** in repo **Settings → Pages**, set **Source** to **GitHub Actions** and
**Custom domain** to `panicsignals.tv`. Tick **Enforce HTTPS** once the certificate is
ready. Pages on the free plan needs the repo to be public.

**DNS at your domain registrar:**

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `panic-signals.github.io` |

**Recommended:** verify `panicsignals.tv` for the Panic-Signals organization (**Org
Settings → Pages → Add a domain**). This stops anyone else's GitHub repo from claiming
your domain.

## Working locally (with mise)

[mise](https://mise.jdx.dev) installs the right Node version and runs everything:

```sh
mise install        # Node 24
mise run setup      # install dependencies
mise run dev        # http://localhost:4321
mise run test       # unit tests
mise run e2e        # browser tests (Chromium + WebKit)
mise run preview    # build and serve the real output
mise run deploy     # test, build, and push main; GitHub Actions publishes it
mise run deploy-status  # watch the publish run
```

To see the intro again locally, open a new tab or clear session storage. It plays once
per browser session.
