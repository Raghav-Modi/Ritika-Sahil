# Ritika & Sahil — wedding invitation

A responsive Indian wedding invitation in maroon, red, and antique gold. The sample includes Shri Ganesh and the Vakratunda shloka, Ritika and Sahil’s names and parents, vertically arranged Hindi event cards, a gently animated couple illustration, and a keyboard-accessible photo gallery.

Names, parents, dates, venues, and subevent timings are personalised. The couple illustration was generated from the user’s twirling photograph. Ganesh artwork was generated for the design sample. The gallery displays the three original WhatsApp JPEG photographs supplied in assets/. Event illustrations are local SVGs. There are no external runtime dependencies.

## Run locally

From the checkout, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The page uses `index.html`, `style.css`, `script.js`, and local images in `assets/`. Edit these files directly; no package installation or build is required.

## Review

Check desktop and mobile layouts, the four Hindi event cards, gallery opening and previous/next controls, Escape to close, keyboard focus, and the Pause motion control. The site respects the operating system's reduced-motion preference. The gallery opens the original photographs in an accessible lightbox; the dancing illustration currently uses a gentle sway rather than articulated character animation.

## Background effects and music

Soft floating gold stars decorate the invitation and follow the Pause motion control and reduced-motion preference. The local `assets/wedding-flute-trimmed.mp3` is the user-supplied Namo Namo flute cover, looped quietly. A maroon-and-gold envelope opens the invitation and starts the music within the visitor’s tap or keyboard activation; a fixed Play music / Mute music control remains available. Muting pauses playback and is remembered in session storage when supported. No external audio service is required.

The opening envelope blocks background interaction until opened and moves keyboard focus into the invitation afterward. Its opening animation respects reduced-motion settings. A previous session mute preference is retained. Without JavaScript the envelope stays hidden and the invitation remains accessible.

## Celebration schedule

- Bhajan Sandhya: Sunday, 15 November 2026, 5 PM; Priti Bhoj at 7:30 PM. Gaudham, Mata Mansa Devi Gaushala, Panchkula.
- Sunehri Shaam: Thursday, 19 November 2026; Sangeet at 4 PM, Priti Bhoj at 7:30 PM. Raghav Hospital, Baltana.
- Bhaat–Mandhaa: Friday, 20 November 2026; Bhaat at 10 AM, Mandhaa at 11:30 AM, Priti Bhoj from 12:30 PM. Raghav Hospital, Baltana.
- Vivah: Saturday, 21 November 2026; Baraat at 2 PM, Varmala at 3:30 PM, Phere at 5 PM, Priti Bhoj at 7 PM, Vidai at 10 PM. Red Bishop Convention Hall, Sector 1, Panchkula.

Gallery captions are removed and frames use gold ornamental borders.

The background track is trimmed at 3:01.4, at the pause preceding the final promotional segment, with a two-second fade-out. The original uploaded MP3 remains preserved in assets/wedding-flute.mp3.
