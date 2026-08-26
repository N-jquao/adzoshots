# adzoshots

Single-page portfolio site for **adzo jane** — night photography, Accra.

Static HTML/CSS/JS. No build step, no framework, no runtime dependencies.
The only external request is the Google Fonts stylesheet (Archivo + Mrs Saint Delafield).

## Layout

```
public/                 # ← the deployed site (Render publish directory)
  index.html            # the whole page
  assets/site.css       # design tokens, components, responsive layer
  assets/site.js        # theme toggle + form feedback
  images/               # responsive photo derivatives, 480/800/1200/1800 px wide
render.yaml             # Render blueprint (static site + cache/security headers)
```

URLs are extensionless — the site is served at `/`, not at a `.html` path.

## Local preview

```bash
python3 -m http.server 4319 --directory public
```

Then open <http://localhost:4319>.

## Deploying to Render

The repo is a Render **Blueprint**. In the Render dashboard: *New → Blueprint*,
point it at this repository, and it reads `render.yaml`. Nothing else to configure.

To wire it up by hand instead, create a **Static Site** with:

| Setting           | Value                             |
| ----------------- | --------------------------------- |
| Build command     | *(leave empty)*                   |
| Publish directory | `public`                          |

## Responsive behaviour

Layout is authored desktop-first with inline styles; `assets/site.css` carries a
breakpoint layer that overrides them. Breakpoints:

| Width    | What changes                                                              |
| -------- | ------------------------------------------------------------------------- |
| ≤ 1180px | tighter gutters and column gaps (small laptops)                            |
| ≤ 980px  | process and testimonial grids drop to 2 columns                            |
| ≤ 900px  | every two-column section stacks; photos lead each work entry (tablets)     |
| ≤ 640px  | header wraps to two rows; price table reflows; prints grid goes 2-up       |
| ≤ 400px  | single-column throughout (small phones)                                    |

Also handled: phones in landscape (shorter sticky header), `prefers-reduced-motion`,
`prefers-color-scheme` plus a manual dark/light toggle persisted in `localStorage`,
and `srcset`/`sizes` on every photograph so phones never download desktop-sized files.

## Regenerating the site

`public/` is compiled from the design-canvas source (`PhotographerPortfolio.dc.html`)
and the full-resolution photographs in `uploads/`. Neither is committed — they are
authoring inputs, not deployment artifacts. Edit `public/` directly, or re-run the
build scripts against a local copy of the canvas source.

## Content note

The photographs are stock images standing in for the real work, and the copy is
placeholder biography. Replace both before this goes live under a real name.
