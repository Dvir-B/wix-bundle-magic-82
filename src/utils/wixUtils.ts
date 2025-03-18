
import { generateMockProducts } from './bundleUtils';
import type { Product } from '../components/BundleCard';

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
const formatV1Product = (product: any): Product => ({
  id: product._id,
  name: product.name,
  price: product.price,
  imageUrl: product.mediaItems?.[0]?.url || 'https://placehold.co/200x200/jpg'
});

// Format a Catalog V3 product to our app's format
const formatV3Product = (product: any): Product => ({
  id: product.id,
  name: product.name,
  price: product.price.price,
  imageUrl: product.media?.mainMedia?.image?.url || 'https://placehold.co/200x200/jpg'
});

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
