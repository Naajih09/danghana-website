import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../lib/productStore';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function Collection() {
  const { products, loading } = useProducts();
  const [params, setParams] = useSearchParams();

  const active = params.get('category') ?? 'All';
  const query = params.get('q') ?? '';

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const shown = products.filter(
    (p) =>
      (active === 'All' || p.category === active) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function setCategory(cat: string) {
    const next = new URLSearchParams(params);
    if (cat === 'All') next.delete('category');
    else next.set('category', cat);
    setParams(next, { replace: true });
  }

  function setQuery(value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value);
    else next.delete('q');
    setParams(next, { replace: true });
  }

  const chips = ['All', ...categories];
  const countFor = (cat: string) => (cat === 'All' ? products.length : products.filter((p) => p.category === cat).length);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Shop</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl">Our collection</h1>
          {!loading && <p className="text-sm text-ink/50">{shown.length} of {products.length} items</p>}
        </div>
      </Reveal>

      {/* Search */}
      <div className="mt-8">
        <div className="relative">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, e.g. shadda or kaftan"
            className="w-full rounded-full border border-ink/10 bg-white py-3.5 pl-12 pr-5 text-sm shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-4 focus:ring-gold/15"
          />
        </div>
      </div>

      {/* Category chips, scroll sideways on phones */}
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {chips.map((cat) => {
          const selected = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition duration-300 ${
                selected ? 'bg-ink text-white shadow-lg shadow-ink/20' : 'bg-white ring-1 ring-ink/10 hover:ring-gold'
              }`}
            >
              {cat}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${selected ? 'bg-white/20' : 'bg-sand text-ink/60'}`}>{countFor(cat)}</span>
            </button>
          );
        })}
      </div>

      {loading && <p className="mt-12 text-ink/60">Loading items…</p>}

      {/* Changing the filter or search remounts the grid so cards animate again */}
      <div key={`${active}-${query}`} className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProductCard key={p.slug} product={p} delay={Math.min(i, 6) * 80} />
        ))}
      </div>

      {!loading && shown.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-serif text-2xl">No items found</p>
          <p className="mt-2 text-sm text-ink/60">Try another search or pick a different category.</p>
        </div>
      )}
    </section>
  );
}