import Image from 'next/image';
import Button from '@/app/_ui/button';

export default function Hero() {
  return (
    <section className="relative h-[30rem] w-full">
      {/* Background Image */}
      <Image
        src="/blog-header-bg.webp"
        alt="Picture of the psalter"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Ausome Parents
          </h1>
          <p className="mx-auto mb-4 max-w-xl text-lg md:text-xl">
            A blog dedicated to inspiring and guiding parents on a journey of
            love, growth, and grace.
          </p>

          {/* CTA for Desktop View  */}
          <div className="hidden w-full items-center justify-center gap-4 md:flex">
            <Button href="#newsletter" variant="primary" size="lg">
              Subscribe
            </Button>

            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
            >
              Contact Us
            </Button>
          </div>

          {/* CTA for Mobile View  */}
          <div className="flex w-full items-center justify-center gap-2 md:hidden">
            <Button href="#newsletter" variant="primary" size="sm">
              Subscribe
            </Button>

            <Button
              href="/contact"
              variant="outline"
              size="sm"
              className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
