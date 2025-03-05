
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Check, Percent, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import ProductSelector from "@/components/ProductSelector";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Product } from "@/components/BundleCard";
import { generateMockProducts, generateId, calculateDiscountedPrice, calculateSavings } from "@/utils/bundleUtils";

const CreateBundle = () => {
  const navigate = useNavigate();
  const [availableProducts] = useState<Product[]>(generateMockProducts(20));
  const [bundleName, setBundleName] = useState("");
  const [bundleDescription, setBundleDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalOriginalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  
  const discountedPrice = calculateDiscountedPrice(selectedProducts, discountPercentage);
  const savingsAmount = calculateSavings(selectedProducts, discountPercentage);
  
  const handleAddProduct = (product: Product) => {
    setSelectedProducts(prev => [...prev, product]);
  };
  
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
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
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
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
              Back
            </Button>
            
            <h1 className="text-3xl font-bold tracking-tight">Create Bundle</h1>
            <p className="text-muted-foreground mt-1 mb-6">
              Create a new product bundle with special pricing
            </p>
          </AnimatedContainer>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AnimatedContainer delay={100} className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Bundle Information</h2>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="name">Bundle Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Summer Essentials Bundle"
                        value={bundleName}
                        onChange={(e) => setBundleName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the bundle and its benefits..."
                        rows={3}
                        value={bundleDescription}
                        onChange={(e) => setBundleDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Bundle Products</h2>
                  <ProductSelector
                    availableProducts={availableProducts}
                    selectedProducts={selectedProducts}
                    onSelectProduct={handleAddProduct}
                    onRemoveProduct={handleRemoveProduct}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Pricing</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="discount">Discount Percentage</Label>
                        <span className="text-sm font-medium">{discountPercentage}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Percent size={16} className="text-muted-foreground" />
                        <Slider
                          id="discount"
                          min={0}
                          max={50}
                          step={1}
                          value={[discountPercentage]}
                          onValueChange={(values) => setDiscountPercentage(values[0])}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Original Price</span>
                        <span>{formatPrice(totalOriginalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount Amount</span>
                        <span className="text-destructive">-{formatPrice(savingsAmount)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Bundle Price</span>
                        <span>{formatPrice(discountedPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Bundle Status</h2>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="active-status">Active</Label>
                      <p className="text-sm text-muted-foreground">
                        Bundle will be available in your store
                      </p>
                    </div>
                    <Switch
                      id="active-status"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/bundles")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !bundleName || selectedProducts.length < 2}
                    className="gap-1"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                    ) : (
                      <Check size={16} />
                    )}
                    Create Bundle
                  </Button>
                </div>
              </AnimatedContainer>
              
              <AnimatedContainer delay={200} className="lg:col-span-1">
                <div className="bg-accent/50 rounded-lg p-6 sticky top-28">
                  <h3 className="font-medium mb-4">Bundle Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Name</div>
                      <div className="font-medium">
                        {bundleName || "Untitled Bundle"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Products</div>
                      <div className="flex items-center gap-1">
                        <Package size={16} />
                        <span className="font-medium">{selectedProducts.length}</span>
                        <span className="text-sm text-muted-foreground">
                          product{selectedProducts.length !== 1 ? "s" : ""} selected
                        </span>
                      </div>
                    </div>
                    
                    {selectedProducts.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Original Price:</span>
                            <span className="font-medium">{formatPrice(totalOriginalPrice)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Discount:</span>
                            <span className="font-medium text-destructive">-{discountPercentage}%</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-border mt-1 pt-1">
                            <span className="text-sm font-semibold">Bundle Price:</span>
                            <span className="font-semibold">{formatPrice(discountedPrice)}</span>
                          </div>
                          <div className="flex items-center justify-between text-green-600 text-xs">
                            <span>Customer Savings:</span>
                            <span>{formatPrice(savingsAmount)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className={`font-medium ${isActive ? "text-green-600" : "text-muted-foreground"}`}>
                        {isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateBundle;
