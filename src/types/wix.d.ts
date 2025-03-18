
interface WixCatalogV1Product {
  _id: string;
  name: string;
  price: number;
  mediaItems?: Array<{ url: string }>;
}

interface WixCatalogV3Product {
  id: string;
  name: string;
  price: {
    price: number;
    discountedPrice?: number;
    currency: string;
  };
  media?: {
    mainMedia?: {
      image?: {
        url: string;
      };
    };
  };
}

interface WixSettings {
  [key: string]: any;
}

interface WixAPI {
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string): void;
  Settings: {
    getSettings(callback: (settings: WixSettings) => void): void;
  };
  Products: {
    getProducts(options: any, callback: (products: WixCatalogV1Product[]) => void): void;
  };
  Stores: {
    getCatalog(): Promise<{
      products: WixCatalogV3Product[];
    }>;
  };
}

declare global {
  interface Window {
    Wix?: WixAPI;
  }
}

export {};
