import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getPublishedPosts, getExcerpt } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || 'https://matt3o.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: getExcerpt(post, 220),
      categories: [post.data.category, ...post.data.tags],
      link: `/${post.id}/`,
    })),
  });
}
