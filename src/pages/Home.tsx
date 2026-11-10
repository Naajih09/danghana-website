import { Link } from 'react-router-dom';
import { STORE } from '../config';
import { useProducts } from '../lib/productStore';
import { whatsappLink } from '../lib/whatsapp';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const tones = [
  'from-[#F5F2EB] to-[#E6D9BE] text-ink',
  'from-[#15171C] to-[#2B2F38] text-white',
  'from-[#F6EBD2] to-[#D9B97A] text-ink',
  'from-white to-[#EDE6D8] text-ink',
];

const steps = [
  { n: '01', title: 'Choose your item', text: 'Browse fabrics and apparel, then pick your size and colour.' },
  { n: '02', title: 'Send on WhatsApp', text: 'Your order details are filled in for you before you send.' },
  { n: '03', title: 'Confirm the details', text: 'We confirm availability, price and collection in the chat.' },
];

export default function Home() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 3);
  const available = products.filter((p) => p.inStock).length;
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const chat = whatsappLink('Assalamu alaikum, I would like to make an enquiry.');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sand to-[#EDE3D1]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-ink/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-14 md:py-28">
          <div className="text-center md:text-left">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-[10px] tracking-[0.3em] text-gold sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {STORE.motto.toUpperCase()}
            </span>
            <h1 className="animate-fade-up mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl" style={{ animationDelay: '120ms' }}>
              Quality textile and apparel from <span className="text-gold">Kaduna</span>
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg md:mx-0" style={{ animationDelay: '240ms' }}>
              Shadda, yadi, kaftan, babban riga, jallabiya and more. Choose your item and order in a few taps on WhatsApp.
            </p>
            <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start" style={{ animationDelay: '360ms' }}>
              <Link to="/collection" className="rounded-full bg-ink px-7 py-4 text-center text-sm font-medium tracking-wide text-white shadow-xl shadow-ink/20 transition active:bg-gold md:hover:-translate-y-0.5 md:hover:bg-gold">
                Shop the collection
              </Link>
              <a href={chat} target="_blank" rel="noreferrer" className="rounded-full border border-ink/10 bg-white px-7 py-4 text-center text-sm font-medium transition active:border-gold md:hover:-translate-y-0.5 md:hover:border-gold">
                Chat with us
              </a>
            </div>
          </div>

          {/* Brand card */}
          <div className="animate-fade-up relative mx-auto w-full max-w-xs sm:max-w-sm" style={{ animationDelay: '200ms' }}>
            <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[2rem] bg-white/80 shadow-2xl shadow-gold/20 ring-1 ring-white backdrop-blur">
              <img src="/brand/logo-mark.png" alt="Dan Ghana DG logo" className="h-28 w-auto sm:h-36" />
              <p className="mt-6 font-serif text-xl tracking-[0.2em] sm:text-2xl">DAN GHANA</p>
              <p className="mt-2 text-[10px] tracking-[0.3em] text-gold sm:text-xs">TEXTILE AND APPAREL</p>
            </div>
            <div className="animate-float absolute -bottom-4 -left-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-6 sm:px-5 sm:py-4">
              <p className="text-[10px] text-ink/50 sm:text-xs">Ordering</p>
              <p className="text-sm font-medium sm:text-base">On WhatsApp</p>
            </div>
            <div className="animate-float absolute -top-4 -right-2 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl sm:-right-6 sm:px-5 sm:py-4" style={{ animationDelay: '1.5s' }}>
              <p className="text-[10px] text-white/60 sm:text-xs">Available now</p>
              <p className="text-sm font-medium sm:text-base">{available} items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Browse</p>
                <h2 className="mt-2 text-3xl sm:text-5xl">Shop by category</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <Reveal key={cat} delay={i * 100}>
                  <Link
                    to={`/collection?category=${encodeURIComponent(cat)}`}
                    className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-5 shadow-sm ring-1 ring-ink/5 transition duration-500 active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-xl ${tones[i % tones.length]}`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">{String(count).padStart(2, '0')} items</span>
                    <div>
                      <p className="font-serif text-2xl sm:text-3xl">{cat}</p>
                      <p className="mt-1 text-xs opacity-70 transition group-hover:opacity-100">View collection →</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-24">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured</p>
              <h2 className="mt-2 text-3xl sm:text-5xl">Popular pieces</h2>
            </div>
            <Link to="/collection" className="rounded-full border border-ink/10 px-5 py-2.5 text-sm transition active:border-gold md:hover:border-gold">
              View all
            </Link>
          </div>
        </Reveal>
        {loading && <p className="text-ink/60">Loading items…</p>}
        {!loading && featured.length === 0 && <p className="text-ink/60">New items are coming soon.</p>}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">How it works</p>
              <h2 className="mt-3 text-3xl sm:text-5xl">Ordering is simple</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 150}>
                <div className="flex items-start gap-5 md:block md:text-center">
                  <span className="font-serif text-4xl text-gold md:text-5xl">{s.n}</span>
                  <div>
                    <h3 className="text-xl md:mt-4 md:text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/60 md:mt-3">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gold/25 via-sand to-white px-6 py-12 text-center ring-1 ring-gold/20 sm:px-8 sm:py-16 md:rounded-[2rem]">
            <h2 className="text-3xl sm:text-5xl">Ready to find your piece?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Message us on WhatsApp for sizing help, fabric choices or to check availability.
            </p>
            <a href={chat} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-ink px-8 py-4 text-sm font-medium tracking-wide text-white shadow-xl shadow-ink/20 transition active:bg-gold md:mt-10 md:hover:-translate-y-0.5 md:hover:bg-gold">
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}