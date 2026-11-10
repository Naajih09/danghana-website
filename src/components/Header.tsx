import { Link, NavLink } from 'react-router-dom';
import { STORE } from '../config';
import { whatsappLink } from '../lib/whatsapp';

const chat = whatsappLink('Assalamu alaikum, I would like to make an enquiry.');

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm transition hover:text-gold ${isActive ? 'font-medium text-ink' : 'text-ink/60'}`;

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/brand/logo-mark-small.png" alt="Dan Ghana logo" className="h-10 w-auto" />
            <div className="leading-tight">
              <p className="font-serif text-base tracking-[0.2em]">{STORE.name.toUpperCase()}</p>
              <p className="hidden text-[10px] tracking-[0.25em] text-gold sm:block">{STORE.tagline.toUpperCase()}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/collection" className={linkClass}>Shop</NavLink>
            <a
              href={chat}
              target="_blank"
              rel="noreferrer"
              className="ml-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gold"
            >
              Chat on WhatsApp
            </a>
          </nav>

          <a href={chat} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-white md:hidden">
            WhatsApp
          </a>
        </div>
      </header>

      {/* Bottom navigation for phones */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/5 bg-white/90 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex">
          <NavLink to="/" end className={({ isActive }) => tabClass(isActive)}>
            <HomeIcon /> Home
          </NavLink>
          <NavLink to="/collection" className={({ isActive }) => tabClass(isActive)}>
            <GridIcon /> Shop
          </NavLink>
          <a href={chat} target="_blank" rel="noreferrer" className={tabClass(false)}>
            <ChatIcon /> Chat
          </a>
        </div>
      </nav>
    </>
  );
}

function tabClass(active: boolean) {
  return `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] transition ${active ? 'text-gold' : 'text-ink/50'}`;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}