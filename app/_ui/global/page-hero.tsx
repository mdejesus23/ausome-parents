import Image from 'next/image';

interface PageHeroProps {
  imageSrc: string;
  title: string;
  excerpt?: string;
}

export default function PageHero({ imageSrc, title, excerpt }: PageHeroProps) {
  return (
    <section className="relative h-[18rem] w-full">
      <Image
        src={imageSrc}
        alt={`${title} background`}
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mx-auto mb-4 max-w-xl text-lg md:text-xl">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
