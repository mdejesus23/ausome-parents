import type { Metadata } from 'next';
import Newsletter from '../_ui/sections/newsletter';
import PageHero from '../_ui/global/page-hero';

export const metadata: Metadata = {
  title: 'About Us | Awesome Parents',
  description:
    'Learn more about the mission, values, and story behind Awesome Parents blog.',
};

export default function Page() {
  return (
    <>
      <PageHero
        title="About us"
        imageSrc="/blog-header-bg.webp"
        excerpt="Our History, Mission, and Values"
      />
      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 text-lg text-gray-700">
            Welcome to <strong>Awesome Parents</strong> — a space dedicated to
            inspiring, empowering, and celebrating every parent’s journey. We
            believe in the strength of families, the power of love, and the
            beauty of growth.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <h2 className="text-primary-600 mb-2 text-xl font-semibold">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To provide helpful, faith-filled, and thoughtful content that
              supports parents in raising children with love, patience, and
              purpose.
            </p>
          </div>

          <div>
            <h2 className="text-primary-600 mb-2 text-xl font-semibold">
              What We Believe
            </h2>
            <p className="text-gray-700">
              Parenting is a lifelong calling. We believe that nurturing the
              spiritual, emotional, and physical well-being of families leads to
              stronger communities.
            </p>
          </div>

          <div>
            <h2 className="text-primary-600 mb-2 text-xl font-semibold">
              Our Story
            </h2>
            <p className="text-gray-700">
              Born from a passion for writing and a heart for families, Awesome
              Parents was created to share real stories, practical advice, and
              encouraging reflections from everyday family life.
            </p>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
