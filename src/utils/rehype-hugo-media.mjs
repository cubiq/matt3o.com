/**
 * Build-time Rehype plugin that brings Hugo Stack-style image & gallery features to Astro Markdown/MDX:
 * 1. Standalone image paragraphs `<p><img ...></p>` -> `<figure class="post-figure">` with Lightbox & `<figcaption>`.
 * 2. Multi-image paragraphs `<p><img ...> <img ...></p>` -> `<div class="md-gallery-row cols-N">` responsive gallery row with Lightbox & captions.
 * 3. Linked images `<p><a href="..."><img ...></a></p>` -> `<figure class="post-figure linked-figure">`.
 */
export function rehypeHugoMedia() {
  function transformNode(node) {
    if (!node || !Array.isArray(node.children)) return;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];

      if (child.type === 'element' && child.tagName === 'p') {
        const meaningful = (child.children || []).filter(
          (c) => !(c.type === 'text' && /^\s*$/.test(c.value || ''))
        );

        const allImages =
          meaningful.length > 0 &&
          meaningful.every((c) => c.type === 'element' && c.tagName === 'img');

        if (allImages && meaningful.length === 1) {
          const img = meaningful[0];
          const src = img.properties?.src || '';
          const alt = (img.properties?.alt || '').trim();
          const caption = alt || 'Post image';

          const figureChildren = [
            {
              type: 'element',
              tagName: 'button',
              properties: {
                type: 'button',
                className: ['lightbox-trigger'],
                'data-lightbox-item': '',
                'data-lightbox-src': src,
                'data-lightbox-alt': caption,
                'data-lightbox-caption': alt,
                'aria-label': `Enlarge image: ${caption}`,
              },
              children: [
                {
                  type: 'element',
                  tagName: 'img',
                  properties: {
                    ...img.properties,
                    loading: 'lazy',
                    decoding: 'async',
                  },
                  children: [],
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['zoom-badge'],
                    'aria-hidden': 'true',
                  },
                  children: [{ type: 'text', value: '[+ ENLARGE]' }],
                },
              ],
            },
          ];

          if (alt) {
            figureChildren.push({
              type: 'element',
              tagName: 'figcaption',
              properties: { className: ['figure-caption'] },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['caption-prefix'], 'aria-hidden': 'true' },
                  children: [{ type: 'text', value: 'fig // ' }],
                },
                { type: 'text', value: alt },
              ],
            });
          }

          node.children[i] = {
            type: 'element',
            tagName: 'figure',
            properties: { className: ['post-figure', 'variant-inline'] },
            children: figureChildren,
          };
          continue;
        }

        if (allImages && meaningful.length > 1) {
          const cols = Math.min(meaningful.length, 5);
          const cells = meaningful.map((img, idx) => {
            const src = img.properties?.src || '';
            const alt = (img.properties?.alt || '').trim();
            const label = alt || `Gallery image ${idx + 1}`;

            const btnChildren = [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['gallery-img-wrap'] },
                children: [
                  {
                    type: 'element',
                    tagName: 'img',
                    properties: {
                      ...img.properties,
                      loading: 'lazy',
                      decoding: 'async',
                    },
                    children: [],
                  },
                ],
              },
            ];

            if (alt) {
              btnChildren.push({
                type: 'element',
                tagName: 'span',
                properties: { className: ['cell-caption'] },
                children: [{ type: 'text', value: alt }],
              });
            }

            return {
              type: 'element',
              tagName: 'div',
              properties: { className: ['gallery-cell'] },
              children: [
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    type: 'button',
                    className: ['gallery-trigger'],
                    'data-lightbox-item': '',
                    'data-lightbox-src': src,
                    'data-lightbox-alt': label,
                    'data-lightbox-caption': alt,
                    'aria-label': `Enlarge image: ${label}`,
                  },
                  children: btnChildren,
                },
              ],
            };
          });

          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['md-gallery-row', `cols-${cols}`],
            },
            children: cells,
          };
          continue;
        }
      }

      transformNode(child);
    }
  }

  return (tree) => {
    transformNode(tree);
  };
}

