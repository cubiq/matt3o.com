import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_CATEGORIES, slugify } from '../consts';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getExcerpt(post: BlogPost, maxLength = 220): string {
  if (post.data.description) return post.data.description;
  if (!post.body) return '';

  // Remove JSX components, images, headings, and code blocks to extract clean prose summary
  const paragraphs = post.body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<(?:Video|Button|Audio|Figure|Gallery)[^>]*\/?>/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .split(/\r?\n\r?\n/)
    .map((p) =>
      p
        .replace(/^#+\s+.*$/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`~>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((p) => p.length > 25);

  const combined = paragraphs.slice(0, 2).join(' ');
  if (combined.length <= maxLength) return combined;
  return combined.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  const posts = await getPublishedPosts();
  const categoryMap = new Map<string, CategoryInfo>();

  for (const cat of DEFAULT_CATEGORIES) {
    categoryMap.set(cat.slug, {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      count: 0,
    });
  }

  for (const post of posts) {
    const slug = slugify(post.data.category);
    const existing = categoryMap.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(slug, {
        name: post.data.category,
        slug,
        description: `Posts filed under ${post.data.category}.`,
        count: 1,
      });
    }
  }

  return Array.from(categoryMap.values());
}

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getPublishedPosts();
  const tagMap = new Map<string, TagInfo>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(slug, {
          name: tag,
          slug,
          count: 1,
        });
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getReadingTime(body?: string): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
