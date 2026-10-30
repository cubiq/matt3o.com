import type { APIRoute } from 'astro';
import { getPublishedPosts, formatDate, getExcerpt } from '../utils/posts';
import { slugify } from '../consts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const index = posts.map((post) => {
    const cleanBody = (post.body || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[`#*_\[\]()>-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2500);

    return {
      slug: post.id,
      title: post.data.title,
      description: getExcerpt(post, 180),
      category: post.data.category,
      categorySlug: slugify(post.data.category),
      tags: post.data.tags,
      date: formatDate(post.data.pubDate),
      body: cleanBody,
    };
  });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
