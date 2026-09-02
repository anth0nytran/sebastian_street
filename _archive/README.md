# Archive

Assets no longer used by the site, kept out of `public/` so they are not
copied into `dist/` on every build.

## `legacy-images/`

The Orange County build's photo library, replaced in full by the client's own
Inland Empire photography.

- `hero.avif`, `home.avif`, `path.avif`, `sellers.avif` — coastal stock
  (Laguna-style aerials, ocean surf, beach palms). Unusable on an Inland Empire
  site: the region is landlocked, and the alt text they shipped with named
  cities the photos were not of.
- `sold_*.jpg`, `tustin.jpeg`, `whiter.jpeg` — listing photos from closed
  transactions. Genuine, but they carry CRMLS watermarks, so they are only
  suitable as heavily-scrimmed background texture, never as foreground imagery.
- `selfie.jpg` — the original headshot, superseded by
  `public/images/sebastian-street.webp` (same photo, optimised).

Nothing here is referenced by the build. Delete freely if you don't want the
history.
