import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '../_ui/global/page-hero';
import ContactForm from '@/app/_ui/contact/contact-form';
import Newsletter from '../_ui/sections/newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Page | Awesome Parents ',
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://awesome-parents.melnerdz.com'), // Update with your real domain
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Us | ' + SITE.title,
  description:
    'Get in touch with the Ausome Parents team. We’d love to hear from you!',
  url: SITE.url + '/contact-us',
  isPartOf: ISPARTOF,
  inLanguage: 'en-US',
};

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-[3rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        imageSrc="/contact-header-bg.webp"
        title="Contact Us"
        excerpt="Feel free to reach out with any questions, ideas, or just to say hi!"
      />
      <ContactForm />
      <Newsletter />
    </div>
  );
}
