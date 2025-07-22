import { SITE, ISPARTOF } from '@/app/_data/constant';
import Hero from '@/app/_ui/sections/hero';
import FeaturedArticles from './_ui/sections/featured-articles';
import Newsletter from './_ui/sections/newsletter';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: SITE.title,
  image: SITE.image,
  description: SITE.description,
  isPartOf: ISPARTOF,
  inLanguage: 'en-US',
};

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-[3rem]">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Hero />
      <FeaturedArticles />
      <Newsletter />
    </div>
  );
}
