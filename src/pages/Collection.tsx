import { useMemo, useState } from 'react';
import { useProducts } from '../lib/productStore';
import ProductCard from '../components/ProductCard';

export default function Collection() {
  const { products, loading } = useProducts();
  const [active, setActive] = useState<string>('All');

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);
  const filters = ['All', ...categories];
  const shown = active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl">Collection</h1>

      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              active === f ? 'border-ink bg-ink text-ivory' : 'border-sand hover:border-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="mt-12 text-ink/60">Loading pieces…</p>}
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {!loading && shown.length === 0 && <p className="mt-12 text-ink/60">No pieces in this category yet.</p>}
    </section>
  );
}
