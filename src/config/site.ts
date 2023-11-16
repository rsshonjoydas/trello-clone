export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'Taskify',
  description: 'Collaborate, manage projects, and reach new productivity peaks',
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: 'https://redolence.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/rsshonjoydas',
    github: 'https://github.com/rsshonjoydas',
  },
};
