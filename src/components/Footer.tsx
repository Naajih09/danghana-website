import { Link } from 'react-router-dom';
import { STORE } from '../config';
import { whatsappLink } from '../lib/whatsapp';

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white md:mt-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl tracking-[0.2em]">{STORE.name.toUpperCase()}</p>
          <p className="mt-2 text-sm text-gold">{STORE.tagline}</p>
          <p className="mt-3 text-sm text-white/60">Motto: {STORE.motto}</p>
        </div>
        <div className="text-sm text-white/80">
          <p className="mb-2 text-gold">Visit us</p>
          <p>{STORE.address}</p>
          <p className="mt-1">{STORE.hours}</p>
        </div>
        <div className="text-sm text-white/80">
          <p className="mb-2 text-gold">Contact</p>
          {STORE.phones.map((ph) => (
            <p key={ph}>{ph}</p>
          ))}
          <a href={`mailto:${STORE.email}`} className="mt-1 block underline underline-offset-4 hover:text-gold">{STORE.email}</a>
          <a href={whatsappLink('Assalamu alaikum, I would like to make an enquiry.')} target="_blank" rel="noreferrer" className="mt-2 block underline underline-offset-4 hover:text-gold">
            WhatsApp {STORE.whatsappDisplay}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 border-t border-white/10 py-4 text-center text-xs text-white/50">
        <span>© {new Date().getFullYear()} {STORE.name}. All rights reserved.</span>
        <Link to="/admin" className="hover:text-gold">Owner</Link>
      </div>
    </footer>
  );
}
