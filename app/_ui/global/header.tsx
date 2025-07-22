import { headerLinks } from '@/app/_data/navlinks';
import NavLink from '@/app/_ui/links/nav-link';
import FaSolidPeopleRoof from '@/app/_ui/icons/FaSolidPeopleRoof';

export default function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between overflow-hidden border-b px-4 py-2 sm:px-6 md:py-4 lg:border-0 lg:px-8 lg:py-6">
      <div className="flex items-end gap-3">
        <FaSolidPeopleRoof size={3} />
        <h1 className="text-text-primary text-2xl font-bold">Ausome Parents</h1>
      </div>

      <nav className="hidden items-center justify-between lg:flex">
        <ul className="flex w-full items-center justify-end gap-6">
          {headerLinks.map((link, ind) => (
            <NavLink
              key={`${link.text}-${ind}`}
              url={link.url}
              text={link.text}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
