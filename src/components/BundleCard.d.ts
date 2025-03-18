
export interface ProductVariant {
  id: string;
  attributes: { [key: string]: string };
  inStock: boolean;
  quantity: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  variants?: ProductVariant[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  discountPercentage: number;
  active: boolean;
}
