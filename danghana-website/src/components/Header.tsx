import { Link, NavLink } from 'react-router-dom';
import { STORE } from '../config';
import { whatsappLink } from '../lib/whatsapp';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition hover:text-gold ${isActive ? 'text-gold' : ''}`;

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-sand bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-serif text-xl tracking-[0.3em]">
          {STORE.name.toUpperCase()}
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/collection" className={navClass}>Collection</NavLink>
          <a
            href={whatsappLink('Assalamu alaikum, I would like to make an enquiry.')}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm text-ivory transition hover:bg-gold sm:inline-block"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
