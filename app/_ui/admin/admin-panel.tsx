import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { Power } from 'lucide-react';
import Button from '../button';

type PanelItem = {
  title: string;
  description: string;
  url: string;
};

async function SignOutForm({ isMobile = false }: { isMobile?: boolean }) {
  const session = await auth();

  return (
    <div
      className={
        isMobile
          ? 'flex items-center justify-center border-t border-gray-100 pt-4'
          : ''
      }
    >
      {session && (
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button variant="primary" size="xs" type="submit" title="Sign out">
            <Power size={18} />
          </Button>
        </form>
      )}
    </div>
  );
}

export default async function AdminPanel() {
  const panelItems: PanelItem[] = [
    {
      title: 'Manage Users',
      description: 'View and edit user roles, activity, and access.',
      url: '/admin/dashboard/users',
    },
    {
      title: 'Blog Posting',
      description: 'Create, update, or delete blog posts.',
      url: '/admin/dashboard/posts',
    },
    {
      title: 'Site Settings',
      description: 'Customize SEO, layout, and feature toggles.',
      url: '/admin/dashboard/settings',
    },
    {
      title: 'Saint in Focus',
      description: 'Create update or delete saint in focus posts.',
      url: '/admin/dashboard/saint-in-focus',
    },
    // {
    //   title: 'Newsletter',
    //   description: 'Send updates or view subscribers.',
    //   url: '/admin/dashboard/newsletter',
    // },
  ];

  return (
    <section className="mx-auto mb-20 w-full max-w-4xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Welcome, Admin!</h2>
        {/* Sign Out Button (Desktop) */}
        <SignOutForm />
      </div>

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
