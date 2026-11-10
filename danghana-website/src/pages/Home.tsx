import { Link } from 'react-router-dom';
import { STORE } from '../config';
import { useProducts } from '../lib/productStore';
import { whatsappLink } from '../lib/whatsapp';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const features = [
  { title: 'Quality textiles', text: 'Shadda, yadi and other fabrics chosen for comfort, weight and a clean finish.' },
  { title: 'Apparel for every occasion', text: 'Kaftan, babban riga, jallabiya and more, for daily wear and special days.' },
  { title: 'Order on WhatsApp', text: 'Choose what you need and confirm the details directly with us in the chat.' },
];

const steps = [
  { n: '01', title: 'Choose your item', text: 'Browse the fabrics and apparel, then pick your size and colour.' },
  { n: '02', title: 'Send on WhatsApp', text: 'Your order details are filled in for you before you send.' },
  { n: '03', title: 'Confirm the details', text: 'We confirm availability, price and collection in the chat.' },
];

export default function Home() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 3);
  const available = products.filter((p) => p.inStock).length;
  const chat = whatsappLink('Assalamu alaikum, I would like to make an enquiry.');

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sand to-[#EDE3D1]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-14 md:py-28">
          <div className="text-center md:text-left">
            <span className="animate-fade-up inline-block rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-[10px] tracking-[0.3em] text-gold sm:text-xs">
              {STORE.motto.toUpperCase()}
            </span>
            <h1 className="animate-fade-up mt-5 text-4xl leading-[1.1] sm:text-5xl md:mt-6 lg:text-6xl" style={{ animationDelay: '120ms' }}>
              Quality textile and apparel from Kaduna
            </h1>
            <p className="animate-fade-up mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg md:mx-0 md:mt-6" style={{ animationDelay: '240ms' }}>
              Shadda, yadi, kaftan, babban riga, jallabiya and more. Choose your item and order in a few taps on WhatsApp.
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-10 md:justify-start" style={{ animationDelay: '360ms' }}>
              <Link to="/collection" className="rounded-full bg-ink px-7 py-4 text-center text-sm font-medium tracking-wide text-white shadow-lg shadow-ink/20 transition active:bg-gold md:hover:-translate-y-0.5 md:hover:bg-gold">
                Shop the collection
              </Link>
              <a href={chat} target="_blank" rel="noreferrer" className="rounded-full border border-ink/10 bg-white px-7 py-4 text-center text-sm font-medium transition active:border-gold md:hover:-translate-y-0.5 md:hover:border-gold">
                Chat with us
              </a>
            </div>
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-xs sm:max-w-md" style={{ animationDelay: '200ms' }}>
            <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[2rem] bg-white/70 shadow-2xl shadow-gold/20 ring-1 ring-white backdrop-blur">
              <img src="/brand/logo-mark.png" alt="Dan Ghana DG logo" className="h-28 w-auto sm:h-40" />
              <p className="mt-5 font-serif text-xl tracking-[0.2em] sm:mt-6 sm:text-2xl">DAN GHANA</p>
              <p className="mt-2 text-[10px] tracking-[0.3em] text-gold sm:text-xs">TEXTILE AND APPAREL</p>
            </div>
            <div className="animate-float absolute -bottom-4 left-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-bottom-6 sm:-left-4 sm:px-5 sm:py-4">
              <p className="text-[10px] text-ink/50 sm:text-xs">Ordering</p>
              <p className="text-sm font-medium sm:text-base">On WhatsApp</p>
            </div>
            <div className="animate-float absolute -top-4 right-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-4 sm:-top-6 sm:px-5 sm:py-4" style={{ animationDelay: '1.5s' }}>
              <p className="text-[10px] text-ink/50 sm:text-xs">Available now</p>
              <p className="text-sm font-medium sm:text-base">{available} items</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition duration-300 md:p-8 md:hover:-translate-y-1 md:hover:shadow-xl">
                <span className="block h-1.5 w-10 rounded-full bg-gold" />
                <h3 className="mt-5 text-xl sm:text-2xl md:mt-6">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/65 md:mt-3">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-24">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured</p>
              <h2 className="mt-2 text-3xl sm:text-5xl md:mt-3">Popular pieces</h2>
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

      <section className="bg-sand/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">How it works</p>
              <h2 className="mt-2 text-3xl sm:text-5xl md:mt-3">Ordering is simple</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 150}>
                <div className="flex items-start gap-5 md:block md:text-center">
                  <span className="font-serif text-4xl text-gold md:text-5xl">{s.n}</span>
                  <div>
                    <h3 className="text-xl md:mt-4 md:text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/65 md:mt-3">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-r from-gold/20 via-sand to-white px-6 py-12 text-center ring-1 ring-gold/20 sm:px-8 sm:py-16 md:rounded-[2rem]">
            <h2 className="text-3xl sm:text-5xl">Ready to find your piece?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Message us on WhatsApp for sizing help, fabric choices or to check availability.
            </p>
            <a href={chat} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-ink px-8 py-4 text-sm font-medium tracking-wide text-white shadow-lg shadow-ink/20 transition active:bg-gold md:mt-10 md:hover:-translate-y-0.5 md:hover:bg-gold">
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
