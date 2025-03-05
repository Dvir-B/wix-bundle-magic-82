
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

// Fetch products from Wix
export const fetchWixProducts = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!isWixEnvironment()) {
      // If not in Wix environment, return mock data
      import('./bundleUtils').then(({ generateMockProducts }) => {
        resolve(generateMockProducts(20));
      });
      return;
    }
    
    // In Wix environment, use Wix API
    window.Wix?.Products.getProducts({}, (products) => {
      if (products && Array.isArray(products)) {
        // Map Wix products to our app's format
        const formattedProducts = products.map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.mediaItems?.[0]?.url || 'https://placehold.co/200x200/jpg'
        }));
        resolve(formattedProducts);
      } else {
        reject(new Error('Failed to fetch products'));
      }
    });
  });
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
