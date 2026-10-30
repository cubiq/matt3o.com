# matt3o.com, a maker's log

Static personal blog built with [Astro](https://astro.build), styled with a dark retro-terminal aesthetic, **JetBrains Mono** typography, and light amber accents.

## Quick Start

```bash
# Start local development server (http://localhost:4321)
npm run dev

# Build static production site into ./dist
npm run build

# Preview production build locally
npm run preview
```

## Authoring Posts

Add `.mdx` or `.md` files to `src/content/blog/<slug>.md` (or `.mdx`) and place any static post assets in `public/<slug>/`. Posts are generated at `https://matt3o.com/<slug>/`.

Both Astro frontmatter and legacy Hugo frontmatter (`date`/`published`, `categories`, `image`) are supported, and `description` is optional (if omitted, the excerpt is automatically extracted from the opening paragraph):

```yaml
---
title: "Post Title"
pubDate: 2026-10-30
category: "DIY" # e.g. News, Knowledge Base, DIY, Reviews
tags: ["keycaps", "3D print", "linux"]
poster: "/my-post-slug/cover.jpg" # optional; if omitted, card uses a title-only terminal header
---
```

### Hugo-Style Markdown Images & Galleries (Built-In)

In addition to explicit MDX components, standard Markdown images are automatically enhanced at build time (`src/utils/rehype-hugo-media.mjs`):
- **Single image on a line (`![Caption](/slug/img.jpg)`)**: Automatically rendered inside a `<figure>` with `<figcaption>` and Lightbox click-to-enlarge.
- **Multiple images on the same line (`![Cap 1](/slug/1.jpg) ![Cap 2](/slug/2.jpg)`)**: Automatically rendered as a responsive 2–5 column gallery row with Lightbox browsing.

### Rich MDX Components (Auto-Imported in Posts)

All `.mdx` posts have the following components automatically available without needing `import` statements:

1. **Images (`<Figure />`)** — inline or full-width, with or without lightbox:
   ```mdx
   <Figure
     src="/images/gallery-stem-cad.svg"
     alt="Stem CAD diagram"
     caption="Optional figure caption"
     variant="inline"
     lightbox={false}
   />

   <Figure
     src="/images/poster-mt3-keycaps.svg"
     alt="Full-width blueprint"
     caption="Click to enlarge in lightbox"
     variant="full"
     lightbox={true}
   />
   ```

2. **Galleries (`<Gallery />`)** — multi-row/column grids integrated with the lightbox:
   ```mdx
   <Gallery
     columns={3}
     lightbox={true}
     caption="Build log gallery"
     images={[
       { src: "/images/gallery-stem-cad.svg", alt: "Step 1", caption: "CAD stem" },
       { src: "/images/gallery-handwire-matrix.svg", alt: "Step 2", caption: "Matrix" },
       { src: "/images/gallery-case-section.svg", alt: "Step 3", caption: "Case" }
     ]}
   />
   ```

3. **Videos (`<Video />`)** — YouTube, Vimeo, external embeds, and self-hosted local videos:
   ```mdx
   <Video provider="youtube" id="dQw4w9WgXcQ" title="YouTube Demo" caption="External video" />
   <Video provider="local" src="/media/keycap-cnc-preview.mp4" title="Local MP4" />
   ```

4. **Audio (`<Audio />`)** — terminal-styled audio player with optional download link:
   ```mdx
   <Audio src="/media/mt3-typing-test.wav" title="Typing Sound Test" caption="Recorded at 30cm" />
   ```

5. **Buttons (`<Button />`)** — download or navigation buttons:
   ```mdx
   <Button href="/media/mt3-homing-dish.scad" variant="primary" download meta="OpenSCAD · 1.1 KB">
     Download Parametric Keycap (.scad)
   </Button>
   ```

## GitHub Pages Deployment

The repository includes `.github/workflows/deploy.yml` and `public/CNAME` (`matt3o.com`).

1. Push to the `main` branch on GitHub.
2. In your GitHub repository, navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Configure your DNS to point to GitHub Pages.
