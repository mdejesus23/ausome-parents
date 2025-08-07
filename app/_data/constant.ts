export const SITE = {
  title: 'Awesome Parents',
  tagline:
    'Catholic reflections and spiritual wisdom for faithful parents raising the next generation with love and grace.',
  description:
    'Awesome Parents is a Catholic blog dedicated to offering holy reflections on Bible verses, faith-filled insights, and spiritual encouragement for parents navigating the journey of family life.',
  description_short:
    'Catholic reflections on Scripture and family life for faithful parents.',
  url: 'https://awesome-parents.melnerdz.com/', // Replace with your actual blog URL
  author: 'Melnard De Jesus', // Replace with your name or pen name
  image: '/images/brandlogo.png',
};

export const ISPARTOF = {
  '@type': 'WebSite',
  url: SITE.url,
  name: SITE.title,
  description: SITE.description,
};

export const POSTS_PER_PAGE = 6;
