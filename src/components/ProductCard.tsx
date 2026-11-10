import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatNaira } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import Reveal from './Reveal';

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const initials = product.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const message = `Assalamu alaikum, I would like to order: ${product.name} (${formatNaira(product.price)}). Please confirm availability.`;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-ink/5 transition duration-500 active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-2xl md:hover:shadow-ink/10">
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-br from-sand via-white to-[#EDE3D1]"
        >
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 md:group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-5xl text-gold/70 transition duration-500 md:group-hover:scale-110 sm:text-6xl">{initials}</span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink/70 shadow-sm backdrop-blur">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/60 text-xs tracking-[0.3em] text-ink/70 backdrop-blur-[2px]">
              UNAVAILABLE
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <Link to={`/product/${product.slug}`} className="font-serif text-lg leading-snug transition group-hover:text-gold sm:text-xl">
            {product.name}
          </Link>
          <p className="mt-2 text-base font-semibold sm:text-lg">{formatNaira(product.price)}</p>
          <div className="mt-auto pt-4">
            {product.inStock ? (
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full bg-ink py-3 text-center text-xs font-medium text-white transition hover:bg-gold sm:text-sm"
              >
                Order on WhatsApp
              </a>
            ) : (
              <span className="block rounded-full border border-ink/10 py-3 text-center text-xs text-ink/50 sm:text-sm">Currently unavailable</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}