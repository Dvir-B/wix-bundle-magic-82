
import CreateBundleForm from "./CreateBundleForm";
import { useEffect, useState } from "react";
import { fetchWixProducts, getWixSettings } from "../../utils/wixUtils";
import { toast } from "sonner";
import { Product } from "@/components/BundleCard";

// Create a wrapper component that will handle Wix-specific initialization
const CreateBundle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wixProducts, setWixProducts] = useState<Product[]>([]);
  const [wixSettings, setWixSettings] = useState<any>(null);

  useEffect(() => {
    const initWixData = async () => {
      try {
        // Load Wix products
        const products = await fetchWixProducts();
        setWixProducts(products);
        
        // Load Wix settings
        const settings = await getWixSettings();
        setWixSettings(settings);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Wix data:", error);
        toast.error("שגיאה בטעינת נתונים מהחנות");
        setIsLoading(false);
      }
    };
    
    initWixData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>טוען נתונים מהחנות...</p>
        </div>
      </div>
    );
  }

  return <CreateBundleForm availableProducts={wixProducts} wixSettings={wixSettings} />;
};

// Re-export the CreateBundle component for easier imports
export default CreateBundle;
