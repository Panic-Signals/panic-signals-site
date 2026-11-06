# Apparitions: what pushes through the static

Drop files in this folder and they join the intro's rotation. One is picked at random
on each visit.

## Images
- `.png`, `.gif` or `.webp`.
- **Transparent PNGs look best:** a hand, face or figure cut out with no background seems
  to come *through* the screen.
- Around 1000–1600 px on the long side is plenty. Keep files under ~1 MB.

## Videos
- `.webm`, `.mp4` or `.mov`. They play muted and short (a few seconds is ideal).
- **Poster image:** give it the same name as an image (`ghost.webm` + `ghost.png`). The
  image is used on phones in data-saver mode and for people who turn off motion. A
  poster isn't shown as a separate apparition.
- **Cut-out (transparent) video:** export WebM with alpha (VP9) for Chrome and Firefox,
  plus an HEVC-with-alpha `.mov` for Safari. A normal video with a background also works
  and looks like a broadcast breaking through.

## Hosted videos (big files)
Big videos are better hosted elsewhere (your own storage or a CDN). List them in
`site.config.yaml`:

```yaml
apparitions:
  videos:
    - url: https://cdn.example.com/hand.webm
      poster: https://cdn.example.com/hand.png
```

The link must point **at the video file itself**. YouTube and Vimeo page links don't
work: they can't be blended into the static.

## Always use one
Set `pinned` in `site.config.yaml` to a filename from this folder (e.g. `hand.png`) or
to one of the video URLs. Leave it empty to go back to random.

## Nothing here?
The intro still plays: static, flash, then the PANIC SIGNALS wordmark.
