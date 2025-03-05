
interface WixSettings {
  [key: string]: any;
}

interface WixAPI {
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string): void;
  Settings: {
    getSettings(callback: (settings: WixSettings) => void): void;
  };
  // Add other Wix API methods as needed
}

// Extend the Window interface to include Wix
declare global {
  interface Window {
    Wix?: WixAPI;
  }
}

export {};
