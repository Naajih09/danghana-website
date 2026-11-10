# Dan Ghana Textile and Apparel website

Catalog site for Dan Ghana, Bus Stop Unguwar Rimi (Shehu Laminu Road), Kaduna. Customers browse fabrics and apparel and order through WhatsApp. The owner adds, edits and removes items with photos at `/admin`.

Stack: React, TypeScript, Vite, Tailwind CSS, Supabase (database, photos, owner login), Vercel (hosting).

## Setup checklist

### 1. Create a separate Supabase project
Use a new project for this store, separate from Sulexattire.
1. In Supabase, click **New project**, name it `danghana`, set a database password and wait for it to finish.
2. Open **SQL Editor > New query**, paste the whole of `supabase/schema.sql`, click **Run**. You should see "Success. No rows returned".
3. Copy the **Project URL** (Data API page) and the **publishable** or **anon public** key (API Keys page).

### 2. Create the owner login
1. **Authentication > Users > Add user > Create new user**. Enter the owner's email and a strong password, tick **Auto Confirm User**.
2. **Authentication > Sign In / Providers > Email**: turn off **Allow new users to sign up**.

### 3. Confirm the store details
Edit `src/config.ts`:
- **WhatsApp number:** the card shows `+233 554 353 939`. The `+233` code is Ghana's, while Nigerian numbers use `+234`. Confirm the correct number before going live.
- **Opening hours:** replace "Opening hours to confirm".
- **Products:** the sample items in `src/data/sampleProducts.ts` have placeholder prices. Replace them in the owner area after going live, or edit that file before deploying.

### 4. Local test (optional)
Copy `.env.example` to `.env`, paste the two Supabase values, then run:

    npm install
    npm run dev

### 5. Push to GitHub
Create an empty repository named `danghana-website`, then run:

    git init
    git branch -M main
    git add .
    git commit -m "Dan Ghana website"
    git remote add origin https://github.com/YOUR-USERNAME/danghana-website.git
    git push -u origin main

### 6. Deploy on Vercel
1. **Add New > Project**, import `danghana-website`.
2. Project name must be lowercase, for example `danghana-website`.
3. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the values from step 1.
4. Click **Deploy**.

## How the owner uses it
- Open `yoursite.vercel.app/admin` and sign in.
- **Add item** creates a fabric or apparel item with name, price, fabric, colours, sizes, description and a photo.
- **Edit** changes an item. **Delete** removes it.
- The **In stock / Unavailable** button controls whether customers can order it.
- Changes appear on the site straight away.
