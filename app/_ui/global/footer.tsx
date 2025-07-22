'use client'; // only if you're using client components and icons are interactive
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

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627..."/></svg>`,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204..."/></svg>`,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/yourchurch',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016..."/></svg>`,
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
