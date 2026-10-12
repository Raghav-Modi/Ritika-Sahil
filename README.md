# Wedding invitation design sample

A responsive Indian wedding invitation in maroon, red, and antique gold. The sample includes Shri Ganesh and the Vakratunda shloka, couple and parent placeholders, vertically arranged Hindi event cards, a gently animated couple illustration, and a keyboard-accessible photo gallery.

All names, dates, venues, and gallery photographs are placeholders. The Ganesh artwork, fictional couple illustration, and fictional gallery photographs were generated for this design sample. Event illustrations are local SVGs. There are no external runtime dependencies.

## Run locally

From the checkout, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The page uses `index.html`, `style.css`, `script.js`, and local images in `assets/`. Edit these files directly; no package installation or build is required.

## Review

Check desktop and mobile layouts, the three Hindi event cards, gallery opening and previous/next controls, Escape to close, keyboard focus, and the Pause motion control. The site respects the operating system's reduced-motion preference. Personal details and original photos can be inserted after design approval; the dancing illustration currently uses a gentle sway rather than articulated character animation.

## Background effects and music

Soft floating gold stars decorate the invitation and follow the Pause motion control and reduced-motion preference. The local `assets/wedding-melody.wav` is an original 48-second flute-style instrumental composition, looped quietly. Browsers that block autoplay start it on the first visitor interaction; a fixed Play music / Mute music control remains available. Muting pauses playback and is remembered in session storage when supported. No external audio service is required.
