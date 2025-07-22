import Image from 'next/image';
import Button from '@/app/_ui/button';

export default function Newsletter() {
  return (
    <section className="relative h-[27rem] w-full">
      {/* Background Image */}
      <Image
        src="/thank-you-bg.webp"
        alt="Newsletter background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay with form */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join the Newsletter
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-lg">
            Get parenting tips, faith-filled reflections, and the latest updates
            from Ausome Parents.
          </p>
          <form className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full max-w-sm rounded-sm border px-5 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
