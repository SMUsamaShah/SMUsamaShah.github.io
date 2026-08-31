# XOSH.ORG

This is a build-free static website. Every published page is an ordinary HTML file, with shared styles in `css/` and assets in their own folders.

## Edit a page

Open the page's `index.html` and edit it directly. For example:

- `text-to-diagram/index.html`
- `p2p-tools/index.html`
- `cv/index.html`

To add a new page, create `your-page/index.html`, then link to it from whichever page should lead to it. Pages may use entirely different markup, CSS and JavaScript when that makes sense.

## Publishing

Push or merge into `source`. The deployment workflow copies the static files to `master`, which GitHub Pages serves. It does not transform or generate the site.
