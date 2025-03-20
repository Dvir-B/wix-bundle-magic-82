import { generateMockProducts } from './bundleUtils';
import type { Product, ProductVariant } from '../components/BundleCard';

/**
 * Utility functions for Wix API integration
 */

// Check if we're running inside a Wix environment
export const isWixEnvironment = (): boolean => {
  return typeof window !== 'undefined' && !!window.Wix;
};

// Get Wix settings with a Promise interface
export const getWixSettings = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!isWixEnvironment()) {
      // Mock settings for development
      resolve({
        currencySymbol: '$',
        defaultDiscountPercentage: 10
      });
      return;
    }
    
    window.Wix?.Settings.getSettings((settings) => {
      resolve(settings);
    });
  });
};

// Format a Catalog V1 product to our app's format
const formatV1Product = (product: any): Product => {
  const baseProduct: Product = {
    id: product._id,
    name: product.name,
    price: product.price,
    imageUrl: product.mediaItems?.[0]?.url || 'https://placehold.co/200x200/jpg'
  };
  
  // Add variants support for Catalog V1
  if (product.variants && product.variants.length > 0) {
    baseProduct.variants = product.variants.map((variant: any): ProductVariant => ({
      id: variant.variantId,
      attributes: variant.attributes,
      inStock: variant.inStock,
      quantity: variant.quantity
    }));
  }
  
  return baseProduct;
};

// Format a Catalog V3 product to our app's format
const formatV3Product = (product: any): Product => {
  const baseProduct: Product = {
    id: product.id,
    name: product.name,
    price: product.price.price,
    imageUrl: product.media?.mainMedia?.image?.url || 'https://placehold.co/200x200/jpg'
  };
  
  // Add variants support for Catalog V3
  if (product.variants && product.variants.length > 0) {
    baseProduct.variants = product.variants.map((variant: any): ProductVariant => ({
      id: variant.id,
      attributes: variant.choices, // V3 uses 'choices' instead of 'attributes'
      inStock: variant.stock.inStock,
      quantity: variant.stock.quantity,
      price: variant.variant_price?.price // V3 supports different prices for variants
    }));
  }
  
  return baseProduct;
};

// Try to detect if we're using Catalog V3 based on the product structure
const isCatalogV3Product = (product: any): boolean => {
  return 'media' in product && 'price' in product && typeof product.price === 'object';
};

// Fetch products from Wix, supporting both V1 and V3 catalogs
export const fetchWixProducts = async (): Promise<Product[]> => {
  if (!isWixEnvironment()) {
    // If not in Wix environment, return mock data
    return generateMockProducts(20);
  }

  try {
    // First try Catalog V3
    if (window.Wix?.Stores?.getCatalog) {
      const { products } = await window.Wix.Stores.getCatalog();
      return products.map(formatV3Product);
    }

    // Fallback to Catalog V1
    return new Promise((resolve, reject) => {
      window.Wix?.Products.getProducts({}, (products) => {
        if (products && Array.isArray(products)) {
          // Check the first product to determine the catalog version
          if (products.length > 0 && isCatalogV3Product(products[0])) {
            resolve(products.map(formatV3Product));
          } else {
            resolve(products.map(formatV1Product));
          }
        } else {
          reject(new Error('Failed to fetch products'));
        }
      });
    });
  } catch (error) {
    console.error('Error fetching Wix products:', error);
    // Return mock data as fallback
    return generateMockProducts(20);
  }
};

// Check bundle variants availability
export const checkBundleVariantsAvailability = (products: Product[]): boolean => {
  // Check if there's enough inventory of all selected variants for the bundle
  for (const product of products) {
    if (product.variants && product.variants.length > 0) {
      // If at least one variant is in stock, the product is available
      const hasAvailableVariant = product.variants.some(variant => variant.inStock && variant.quantity > 0);
      if (!hasAvailableVariant) return false;
    }
  }
  return true;
};

// Calculate the maximum bundle quantity based on available inventory
export const calculateMaxBundleQuantity = (products: Product[]): number => {
  let maxQuantity = Infinity;
  
  for (const product of products) {
    if (product.variants && product.variants.length > 0) {
      // Find the variant with the highest inventory
      const maxVariantQuantity = Math.max(
        ...product.variants
          .filter(variant => variant.inStock)
          .map(variant => variant.quantity || 0)
      );
      
      maxQuantity = Math.min(maxQuantity, maxVariantQuantity);
    } else {
      // If no variants, use the regular product inventory (set as Infinity since we don't have that info)
      maxQuantity = Math.min(maxQuantity, Infinity);
    }
  }
  
  return isFinite(maxQuantity) ? maxQuantity : 0;
};

// Format price according to Wix settings
export const formatPrice = (price: number, currencySymbol = '$'): string => {
  return `${currencySymbol}${price.toFixed(2)}`;
};

// Save bundle to Wix (in a real implementation, this would use Wix APIs)
export const saveBundle = (bundle: any): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Bundle saved:', bundle);
      resolve({ success: true, bundle });
    }, 800);
  });
};
