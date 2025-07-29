import Link from 'next/link';

type PanelItem = {
  title: string;
  description: string;
  url: string;
};

export default function AdminPanel() {
  const panelItems: PanelItem[] = [
    {
      title: 'Manage Users',
      description: 'View and edit user roles, activity, and access.',
      url: '/users',
    },
    {
      title: 'Blog Posting',
      description: 'Create, update, or delete blog posts.',
      url: '/admin/dashboard/posts/create',
    },
    {
      title: 'Site Settings',
      description: 'Customize SEO, layout, and feature toggles.',
      url: '/settings',
    },
    {
      title: 'Newsletter',
      description: 'Send updates or view subscribers.',
      url: '/newsletter',
    },
  ];

  return (
    <section className="mx-auto mb-20 w-full max-w-4xl px-4">
      <h2 className="mb-6 text-2xl font-semibold">Welcome, Admin!</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {panelItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={item.url}>
              <h3 className="text-text-secondary mb-2 text-lg font-medium">
                {item.title}
              </h3>
            </Link>

            <p className="text-text-secondary text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
