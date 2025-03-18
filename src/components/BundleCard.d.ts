
export interface ProductVariant {
  id: string;
  attributes: {
    [key: string]: string;
  };
  inStock: boolean;
  quantity: number;
  price?: number; // אופציונלי - רק בגרסה V3 יש מחיר לווריאנט
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  variants?: ProductVariant[]; // הוספת תמיכה בווריאנטים
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  discountPercentage: number;
  active: boolean;
}
