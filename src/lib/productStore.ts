import { useCallback, useEffect, useState } from 'react';
import { supabase, supabaseReady } from './supabase';
import { sampleProducts } from '../data/sampleProducts';
import type { Product } from '../types';

type Row = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  fabric: string;
  colours: string[];
  sizes: string[];
  description: string;
  image: string;
  in_stock: boolean;
};

export function fromRow(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    price: r.price,
    fabric: r.fabric,
    colours: r.colours,
    sizes: r.sizes,
    description: r.description,
    image: r.image,
    inStock: r.in_stock,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function splitList(text: string): string[] {
  return text.split(',').map((x) => x.trim()).filter(Boolean);
}

export function useProducts() {
  // With no database connected, show the sample products so the site still looks complete.
  const [products, setProducts] = useState<Product[]>(supabaseReady ? [] : sampleProducts);
  const [loading, setLoading] = useState<boolean>(supabaseReady);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setProducts((data as Row[] | null)?.map(fromRow) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, reload: load };
}
