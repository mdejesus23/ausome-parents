import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '../_ui/global/page-hero';
import AdminPanel from '@/app/_ui/admin/admin-panel';
import { auth } from '@/auth';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Admin Dashboard | ' + SITE.title,
  description: 'Admin dashboard for managing site content and settings.',
  url: SITE.url + '/admin',
  isPartOf: ISPARTOF,
  inLanguage: 'en-US',
};

export default async function Page() {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
    return <p>You are not authorized to view this page!</p>;
  }

  return (
    <div className="flex w-full flex-col gap-[3rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        imageSrc="/blog-header-bg.webp"
        title="Admin Dashboard"
        excerpt="Manage content, users, and settings from a central place."
      />
      <AdminPanel />
    </div>
  );
}
