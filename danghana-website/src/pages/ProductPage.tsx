import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../lib/productStore';
import { formatNaira } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';

export default function ProductPage() {
  const { slug } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const [size, setSize] = useState<string>('');
  const [colour, setColour] = useState<string>('');

  if (loading) {
    return <section className="mx-auto max-w-xl px-6 py-24 text-center text-ink/60">Loading…</section>;
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-4xl">Piece not found</h1>
        <Link to="/collection" className="mt-6 inline-block text-gold underline">Back to collection</Link>
      </section>
    );
  }

  const details = [size && `Size: ${size}`, colour && `Colour: ${colour}`].filter(Boolean).join(', ');
  const message = `Assalamu alaikum, I would like to order: ${product.name} (${formatNaira(product.price)})${details ? `, ${details}` : ''}. Please confirm availability.`;

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
      <div className="aspect-[3/4] overflow-hidden bg-sand">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center font-serif text-4xl text-gold">
            {product.name}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{product.category}</p>
        <h1 className="mt-3 text-4xl">{product.name}</h1>
        <p className="mt-4 text-2xl text-gold">{formatNaira(product.price)}</p>
        {product.description && <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>}
        {product.fabric && <p className="mt-4 text-sm text-ink/60">Fabric: {product.fabric}</p>}

        {product.sizes.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 rounded-full border px-4 py-2 text-sm transition ${
                    size === s ? 'border-ink bg-ink text-ivory' : 'border-sand hover:border-gold'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colours.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium">Colour</p>
            <div className="flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c}
                  onClick={() => setColour(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    colour === c ? 'border-ink bg-ink text-ivory' : 'border-sand hover:border-gold'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          {product.inStock ? (
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-ink px-8 py-4 text-center text-sm tracking-widest text-ivory transition hover:bg-gold"
            >
              ORDER ON WHATSAPP
            </a>
          ) : (
            <p className="rounded-full border border-sand px-8 py-4 text-center text-sm text-ink/60">
              Currently unavailable
            </p>
          )}
          <p className="mt-3 text-center text-xs text-ink/50">
            You will be connected to our WhatsApp to confirm your order and payment.
          </p>
        </div>
      </div>
    </section>
  );
}
