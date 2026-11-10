import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatNaira } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';

export default function ProductCard({ product }: { product: Product }) {
  const initials = product.name.split(' ').map((w) => w[0]).join('').slice(0, 3);
  const message = `Assalamu alaikum, I would like to order: ${product.name} (${formatNaira(product.price)}). Please confirm availability.`;

  return (
    <article className="flex flex-col">
      <Link to={`/product/${product.slug}`} className="group block aspect-[3/4] overflow-hidden bg-sand">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-3xl text-gold">{initials}</div>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link to={`/product/${product.slug}`} className="font-serif text-xl hover:text-gold">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-gold">{formatNaira(product.price)}</p>
        {!product.inStock && <p className="mt-1 text-xs text-red-700">Currently unavailable</p>}
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-auto pt-4 text-sm font-medium tracking-wide text-ink underline underline-offset-4 hover:text-gold"
        >
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
