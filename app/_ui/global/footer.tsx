'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

const footerNavs = [
  {
    title: 'About',
    items: [
      { text: 'About Us', href: '/about-us' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { text: 'Sermons', href: '/sermons' },
      { text: 'Events', href: '/events' },
      { text: 'Posts', href: '/posts' },
      { text: 'Ministries', href: '/ministries' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { text: 'Giving', href: '/giving' },
      { text: 'Prayer Request', href: '/contact#prayer' },
      { text: 'Newsletter', href: '/contact#newsletter' },
      { text: 'Volunteer', href: '/im-new#volunteer' },
    ],
  },
];

// Social media links
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61578399737770',
    icon: <Facebook size={25} />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ausome_parents23/',
    icon: <Instagram size={25} />,
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Church Info */}
          <div>
            <div className="mb-4">
              <Link
                href="/"
                className="inline-flex items-end gap-3 font-serif text-2xl font-bold text-white"
              >
                <Image
                  src="/ap-logo-white.png"
                  alt="brand logo image"
                  width={60}
                  height={60}
                  className="hidden h-auto w-auto md:block"
                />

                <Image
                  src="/ap-logo-white.png"
                  alt="brand logo image"
                  width={40}
                  height={40}
                  className="block h-auto w-auto md:hidden"
                />
                <span>Ausome Parents</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation Groups */}
          {footerNavs.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-lg font-bold text-white">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-primary-300 text-gray-300 transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ausome Parents. All rights reserved.</p>
          <p className="mt-2 space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-primary-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary-300 transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
