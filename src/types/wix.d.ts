
interface Window {
  Wix?: {
    addEventListener: (event: string, callback: () => void) => void;
    removeEventListener: (event: string) => void;
    Settings: {
      getSettings: (callback: (settings: any) => void) => void;
      triggerSettingsUpdatedEvent: (settings: any, onFailure: (error: any) => void) => void;
    };
    Utils: {
      openModal: (url: string, options: any, onClose: () => void) => void;
      navigateToSection: (sectionId: string) => void;
    };
    Dashboard: {
      openBillingPage: () => void;
      openSectionPage: (sectionId: string) => void;
    };
    Products: {
      getProducts: (options: any, callback: (products: any) => void) => void;
    };
  };
}
