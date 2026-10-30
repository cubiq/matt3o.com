import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date().optional(),
      date: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      poster: z.string().optional(),
      image: z.string().optional(),
      posterAlt: z.string().optional(),
      category: z.string().optional(),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    })
    .transform((data) => {
      const pubDate = data.pubDate || data.date || data.published || new Date('2020-01-01');
      const rawCat = data.category || (data.categories && data.categories[0]) || 'News';
      const poster = data.poster || data.image;
      return {
        ...data,
        pubDate,
        category: rawCat,
        poster,
      };
    }),
});

export const collections = { blog };
