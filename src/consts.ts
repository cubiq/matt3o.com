export const SITE_TITLE = 'matt3o.com';
export const SITE_TAGLINE = "a maker's log // keycaps, custom keyboards, 3d printing, DIY, linux & stuff";
export const SITE_DESCRIPTION =
  'Blog by Matteo Spinelli (matt3o) on custom keycap profiles (MT3, MTNU, PBS, PFF), mechanical keyboards, 3D printing, Linux, open source and other nerdy stuff';
export const SITE_AUTHOR = 'Matteo Spinelli (matt3o)';

export const DEFAULT_CATEGORIES = [
  {
    name: 'News',
    slug: 'news',
    description: 'Updates on keycap sets, group buys, prototypes, and community announcements.',
  },
  {
    name: 'Knowledge Base',
    slug: 'knowledge-base',
    description: 'Deep dives into keycap profiles (MT3, PBS, PFF, MTNU), keyboard history, and guides.',
  },
  {
    name: 'DIY',
    slug: 'diy',
    description: 'Custom handwired keyboards, 3D printing, open-source STLs, Linux servers, and workshop builds.',
  },
  {
    name: 'Reviews',
    slug: 'reviews',
    description: 'Hands-on testing and teardowns of switches, keyboards, 3D printers, and other nerdy stuff.',
  },
] as const;

export const POSTS_PER_PAGE = 10;

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
