export type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  price: number; // in naira
  fabric: string;
  colours: string[];
  sizes: string[];
  description: string;
  image: string; // full URL, or empty for no photo yet
  inStock: boolean;
};
