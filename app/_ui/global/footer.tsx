'use client';

import FaSolidPeopleRoof from '../icons/FaSolidPeopleRoof';

const footerNavs = [
  {
    title: 'About',
    items: [
      { text: 'About Us', href: '/about-us' },
      { text: "I'm New", href: '/im-new' },
      { text: 'Staff', href: '/staff' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { text: 'Sermons', href: '/sermons' },
      { text: 'Events', href: '/events' },
      { text: 'Blog', href: '/blog' },
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
    href: 'https://facebook.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>`,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>`,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>`,
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
              <a
                href="/"
                className="inline-flex items-end gap-3 font-serif text-2xl font-bold text-white"
              >
                <FaSolidPeopleRoof size={2} color="text-white" />
                <span>Ausome Parents</span>
              </a>
            </div>

            <address className="mb-4 text-gray-300 not-italic">
              <p>123 Main Street</p>
              <p>Anytown, ST 12345</p>
              <p className="mt-2">
                <a href="tel:+15551234567" className="hover:text-primary-300">
                  (555) 123-4567
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@churchname.org"
                  className="hover:text-primary-300"
                >
                  info@churchname.org
                </a>
              </p>
            </address>

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
                  dangerouslySetInnerHTML={{ __html: link.icon }}
                />
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
          <p className="mt-2">
            <a href="/privacy-policy" className="hover:text-primary-300 mr-4">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-primary-300">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
