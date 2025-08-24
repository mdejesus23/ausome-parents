import PageHero from '@/app/_ui/global/page-hero';
import {
  getSaints,
  fetchSaintsPages,
} from '@/app/_lib/saints-in-focus/data-services';
import { SITE } from '@/app/_data/constant';
import { Plus } from 'lucide-react';
import type { Saint } from '@/types';
import Button from '@/app/_ui/button';
import { Suspense } from 'react';
import SaintTable from '@/app/_ui/admin/saint-table';
import Loader from '@/app/_ui/loader';
import Search from '@/app/_ui/search';
import Pagination from '@/app/_ui/pagination';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = params?.page || 1;
  const [totalPages, saints]: [totalPages: number, saints: Saint[]] =
    await Promise.all([fetchSaintsPages(query), getSaints()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Saints in Focus | ' + SITE.title,
    url: SITE.url + '/saints',
    about: saints.map((saint) => ({
      '@type': 'Person',
      name: saint.name,
      image: saint.image ? [SITE.url + saint.image] : undefined,
      description: saint.description,
      deathDate: saint.feast_day || undefined,
      sameAs: saint.slug ? SITE.url + '/saints/' + saint.slug : undefined,
    })),
  };

  return (
    <div className="flex w-full flex-col gap-[3rem]">
      {/* ✅ Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        imageSrc="/blog-header-bg.webp"
        title="Saints in Focus"
        excerpt="Discover the lives and feast days of saints."
      />

      <section className="container mx-auto my-20 px-4">
        <div className="mb-8 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search saints..." />
          <Button href="/admin/dashboard/saints/create">
            Add New Saint
            <Plus />
          </Button>
        </div>

        <Suspense fallback={<Loader />}>
          <SaintTable query={query} currentPage={Number(currentPage)} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
