
import { Bundle, Product } from "../components/BundleCard";

// Sample product images for demonstration
const productImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=200&h=200&auto=format&fit=crop",
];

// Generate mock products
export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    imageUrl: productImages[i % productImages.length],
  }));
};

// Generate mock bundles
export const generateMockBundles = (count: number, products: Product[]): Bundle[] => {
  return Array.from({ length: count }, (_, i) => {
    const productCount = Math.floor(Math.random() * 4) + 2; // 2-5 products per bundle
    const bundleProducts = [];
    
    // Avoid duplicate products in a bundle
    const usedIndices = new Set<number>();
    
    while (bundleProducts.length < productCount && usedIndices.size < products.length) {
      const index = Math.floor(Math.random() * products.length);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        bundleProducts.push(products[index]);
      }
    }
    
    return {
      id: `bundle-${i + 1}`,
      name: `Bundle ${i + 1}`,
      description: `A great bundle with ${productCount} amazing products at a discounted price.`,
      products: bundleProducts,
      discountPercentage: Math.floor(Math.random() * 30) + 5, // 5-35% discount
      active: Math.random() > 0.3, // 70% chance of being active
    };
  });
};

// Calculate discounted price
export const calculateDiscountedPrice = (products: Product[], discountPercentage: number): number => {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  return totalPrice * (1 - discountPercentage / 100);
};

// Calculate savings amount
export const calculateSavings = (products: Product[], discountPercentage: number): number => {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  return totalPrice * (discountPercentage / 100);
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
