import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: 'Raising Resilient Kids in the Digital Age',
    excerpt:
      'Learn how to help your children thrive with confidence and kindness in today’s tech-driven world.',
    image: '/dummy.jpg',
    date: 'July 20, 2025',
  },
  {
    id: 2,
    title: 'Balancing Work and Family Gracefully',
    excerpt:
      'Explore practical tips for managing your career while nurturing a happy, connected home.',
    image: '/dummy.jpg',
    date: 'July 15, 2025',
  },
  {
    id: 3,
    title: 'Faith-Filled Parenting for Everyday Life',
    excerpt:
      'Discover how simple spiritual practices can bring peace and purpose to your parenting journey.',
    image: '/dummy.jpg',
    date: 'July 10, 2025',
  },
];

export default function FeaturedArticles() {
  return (
    <section className="my-20 flex flex-col">
      <div className="container mx-auto px-4 py-2 sm:px-6 md:py-4 lg:px-8 lg:py-6">
        <h2 className="text-text-secondary mb-6 text-center text-3xl font-bold">
          Featured Articles
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Discover insightful articles to guide and inspire you on your
          parenting journey.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="mb-2 text-sm text-gray-500">{post.date}</p>
                <h3 className="mb-3 text-xl font-semibold">{post.title}</h3>
                <p className="mb-4 text-gray-700">{post.excerpt}</p>
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
