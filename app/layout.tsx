import type { Metadata } from 'next';
import { source } from '@/app/_ui/fonts';
import '@/app/_ui/global.css';
import Header from '@/app/_ui/global/header';
import Footer from './_ui/global/footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    template: '%s | Awesome Parents',
    default: 'Awesome Parents',
  },
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://ausome-parents.melnerdz.com/'),
  openGraph: {
    title: 'Awesome Parents',
    description:
      'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
    images: ['https://ausome-parents.melnerdz.com/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome Parents',
    description:
      'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
    images: ['https://ausome-parents.melnerdz.com/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${source.className} text-text-secondary bg-primary antialiased`}
      >
        <Header />
        <main className="flex min-h-[80vh] flex-col gap-[3rem]">
          <Toaster position="top-center" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
