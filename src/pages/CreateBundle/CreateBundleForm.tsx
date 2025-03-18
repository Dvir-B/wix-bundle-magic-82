
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Product } from "@/components/BundleCard";
import { generateMockProducts, generateId } from "@/utils/bundleUtils";

import BundlePreviewDialog from "./components/BundlePreviewDialog";
import BundleDetailsSection from "./components/BundleDetailsSection";
import ProductSelectionSection from "./components/ProductSelectionSection";
import BundlePricingSection from "./components/BundlePricingSection";
import BundleStatusSection from "./components/BundleStatusSection";
import BundleSummary from "./components/BundleSummary";

const CreateBundleForm = () => {
  const navigate = useNavigate();
  const [availableProducts] = useState<Product[]>(generateMockProducts(20));
  const [bundleName, setBundleName] = useState("");
  const [bundleDescription, setBundleDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const handleAddProduct = (product: Product) => {
    setSelectedProducts(prev => [...prev, product]);
  };
  
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const handlePreview = () => {
    if (!bundleName.trim()) {
      toast.error("נא להזין שם לחבילה לפני תצוגה מקדימה");
      return;
    }
    
    if (selectedProducts.length < 2) {
      toast.error("נא לבחור לפחות 2 מוצרים לחבילה");
      return;
    }
    
    setPreviewOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bundleName.trim()) {
      toast.error("Please enter a bundle name");
      return;
    }
    
    if (selectedProducts.length < 2) {
      toast.error("Please select at least 2 products for the bundle");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new bundle
      const newBundle = {
        id: generateId(),
        name: bundleName,
        description: bundleDescription,
        products: selectedProducts,
        discountPercentage,
        active: isActive,
      };
      
      toast.success("Bundle created successfully");
      setIsSubmitting(false);
      navigate("/bundles");
    }, 800);
  };
  
  // Create a preview bundle object
  const previewBundle = {
    id: "preview-" + generateId(),
    name: bundleName || "Untitled Bundle",
    description: bundleDescription || "No description provided",
    products: selectedProducts,
    discountPercentage,
    active: isActive,
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedContainer>
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} className="mr-1" />
              חזרה
            </Button>
            
            <h1 className="text-3xl font-bold tracking-tight">יצירת חבילה</h1>
            <p className="text-muted-foreground mt-1 mb-6">
              צור חבילת מוצרים חדשה במחיר מיוחד
            </p>
          </AnimatedContainer>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AnimatedContainer delay={100} className="lg:col-span-2 space-y-8">
                <BundleDetailsSection 
                  bundleName={bundleName} 
                  setBundleName={setBundleName}
                  bundleDescription={bundleDescription} 
                  setBundleDescription={setBundleDescription} 
                />
                
                <ProductSelectionSection 
                  availableProducts={availableProducts}
                  selectedProducts={selectedProducts}
                  onAddProduct={handleAddProduct}
                  onRemoveProduct={handleRemoveProduct}
                />
                
                <BundlePricingSection
                  selectedProducts={selectedProducts}
                  discountPercentage={discountPercentage}
                  setDiscountPercentage={setDiscountPercentage}
                />
                
                <BundleStatusSection 
                  isActive={isActive} 
                  setIsActive={setIsActive} 
                />
                
                <div className="flex justify-between gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    disabled={!bundleName || selectedProducts.length < 2}
                    className="gap-1"
                  >
                    <Eye size={16} className="ms-1" />
                    תצוגה מקדימה
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/bundles")}
                    >
                      ביטול
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !bundleName || selectedProducts.length < 2}
                      className="gap-1"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                      ) : (
                        <Check size={16} className="ms-1" />
                      )}
                      יצירת חבילה
                    </Button>
                  </div>
                </div>
              </AnimatedContainer>
              
              <AnimatedContainer delay={200} className="lg:col-span-1">
                <BundleSummary 
                  bundleName={bundleName}
                  selectedProducts={selectedProducts}
                  discountPercentage={discountPercentage}
                  isActive={isActive}
                />
              </AnimatedContainer>
            </div>
          </form>
        </div>
      </main>
      
      <BundlePreviewDialog 
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        previewBundle={previewBundle}
      />
    </div>
  );
};

export default CreateBundleForm;
