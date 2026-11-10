import { FormEvent, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseReady } from '../lib/supabase';
import { fromRow, slugify, splitList, useProducts } from '../lib/productStore';
import { formatNaira } from '../lib/format';
import type { Product } from '../types';

const inputClass = 'mt-1 w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm outline-none focus:border-gold';
const labelClass = 'block text-sm font-medium';

function errorText(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err) return String((err as { message: unknown }).message);
  return 'Something went wrong. Please try again.';
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState<boolean>(supabaseReady);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!supabaseReady) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24">
        <h1 className="text-4xl">Owner area not connected</h1>
        <p className="mt-4 text-ink/70">
          The database is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as described in the README, then redeploy.
        </p>
      </section>
    );
  }

  if (checking) return <p className="px-6 py-24 text-center text-ink/60">Loading…</p>;
  if (!session) return <Login />;
  return <Dashboard onSignOut={() => supabase?.auth.signOut()} />;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError('Email or password is incorrect.');
    setBusy(false);
  }

  return (
    <section className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-4xl">Owner sign in</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className={labelClass}>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className={labelClass}>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-full bg-ink px-6 py-3 text-sm tracking-widest text-ivory hover:bg-gold disabled:opacity-60">
          {busy ? 'SIGNING IN…' : 'SIGN IN'}
        </button>
      </form>
    </section>
  );
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const { products, loading, error, reload } = useProducts();
  const [editing, setEditing] = useState<Product | 'new' | null>(null);

  if (editing) {
    return (
      <ProductForm
        initial={editing === 'new' ? null : editing}
        onDone={() => {
          setEditing(null);
          reload();
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  async function toggleStock(p: Product) {
    if (!supabase || !p.id) return;
    const { error: updateError } = await supabase.from('products').update({ in_stock: !p.inStock }).eq('id', p.id);
    if (updateError) alert(errorText(updateError));
    reload();
  }

  async function remove(p: Product) {
    if (!supabase || !p.id) return;
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('products').delete().eq('id', p.id);
    if (deleteError) alert(errorText(deleteError));
    reload();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl">Your pieces</h1>
        <div className="flex gap-3">
          <button onClick={() => setEditing('new')} className="rounded-full bg-ink px-5 py-2 text-sm tracking-wide text-ivory hover:bg-gold">
            Add item
          </button>
          <button onClick={onSignOut} className="rounded-full border border-sand px-5 py-2 text-sm hover:border-gold">
            Sign out
          </button>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
      {loading && <p className="mt-8 text-ink/60">Loading…</p>}
      {!loading && products.length === 0 && <p className="mt-8 text-ink/60">No pieces yet. Click "Add item" to start.</p>}

      <ul className="mt-8 divide-y divide-sand">
        {products.map((p) => (
          <li key={p.id ?? p.slug} className="flex flex-wrap items-center gap-4 py-4">
            <div className="h-16 w-12 flex-shrink-0 overflow-hidden bg-sand">
              {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg">{p.name}</p>
              <p className="text-sm text-ink/60">{formatNaira(p.price)} · {p.category}</p>
            </div>
            <button onClick={() => toggleStock(p)} className={`rounded-full border px-3 py-1 text-xs ${p.inStock ? 'border-gold text-gold' : 'border-red-700 text-red-700'}`}>
              {p.inStock ? 'In stock' : 'Unavailable'}
            </button>
            <button onClick={() => setEditing(p)} className="text-sm underline underline-offset-4 hover:text-gold">Edit</button>
            <button onClick={() => remove(p)} className="text-sm text-red-700 underline underline-offset-4">Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductForm({
  initial,
  onDone,
  onCancel,
}: {
  initial: Product | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? 'Fabrics');
  const [price, setPrice] = useState(initial ? String(initial.price) : '');
  const [fabric, setFabric] = useState(initial?.fabric ?? '');
  const [colours, setColours] = useState(initial ? initial.colours.join(', ') : '');
  const [sizes, setSizes] = useState(initial ? initial.sizes.join(', ') : '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [inStock, setInStock] = useState(initial?.inStock ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!name.trim() || !price) {
      setMessage('Name and price are required.');
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      let image = initial?.image ?? '';
      const slug = initial?.slug ?? `${slugify(name)}-${Date.now().toString(36).slice(-4)}`;

      if (file) {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const path = `${slug}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(path, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        image = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
      }

      const row = {
        slug,
        name: name.trim(),
        category: category.trim() || 'Fabrics',
        price: Math.round(Number(price)),
        fabric: fabric.trim(),
        colours: splitList(colours),
        sizes: splitList(sizes),
        description: description.trim(),
        image,
        in_stock: inStock,
      };

      const result = initial?.id
        ? await supabase.from('products').update(row).eq('id', initial.id)
        : await supabase.from('products').insert(row);
      if (result.error) throw result.error;

      onDone();
    } catch (err) {
      setMessage(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl">{initial ? 'Edit item' : 'Add item'}</h1>
      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <label className={labelClass}>
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Category
            <input list="category-options" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
            <datalist id="category-options">
              <option value="Fabrics" />
              <option value="Apparel" />
              <option value="Kayan Dinki" />
              <option value="Accessories" />
            </datalist>
          </label>
          <label className={labelClass}>
            Price (₦)
            <input type="number" min="0" required value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
          </label>
        </div>

        <label className={labelClass}>
          Fabric
          <input value={fabric} onChange={(e) => setFabric(e.target.value)} className={inputClass} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Colours (comma separated)
            <input value={colours} onChange={(e) => setColours(e.target.value)} placeholder="Navy, White, Cream" className={inputClass} />
          </label>
          <label className={labelClass}>
            Sizes (comma separated)
            <input value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="M, L, XL, XXL" className={inputClass} />
          </label>
        </div>

        <label className={labelClass}>
          Description
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
        </label>

        <div>
          <p className={labelClass}>Photo</p>
          {initial?.image && !file && <img src={initial.image} alt="" className="mt-2 h-32 w-24 object-cover" />}
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-2 text-sm" />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-4 w-4 accent-ink" />
          In stock (customers can order)
        </label>

        {message && <p className="text-sm text-red-700">{message}</p>}

        <div className="flex gap-3 pt-2">
          <button disabled={busy} className="rounded-full bg-ink px-6 py-3 text-sm tracking-widest text-ivory hover:bg-gold disabled:opacity-60">
            {busy ? 'SAVING…' : 'SAVE'}
          </button>
          <button type="button" onClick={onCancel} className="rounded-full border border-sand px-6 py-3 text-sm hover:border-gold">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
