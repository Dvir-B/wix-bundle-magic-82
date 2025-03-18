
import { Percent } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/components/BundleCard";
import { calculateDiscountedPrice, calculateSavings } from "@/utils/bundleUtils";

interface BundlePricingSectionProps {
  selectedProducts: Product[];
  discountPercentage: number;
  setDiscountPercentage: (discount: number) => void;
}

const BundlePricingSection: React.FC<BundlePricingSectionProps> = ({
  selectedProducts,
  discountPercentage,
  setDiscountPercentage
}) => {
  const totalOriginalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  
  const discountedPrice = calculateDiscountedPrice(selectedProducts, discountPercentage);
  const savingsAmount = calculateSavings(selectedProducts, discountPercentage);
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">תמחור</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="discount">אחוז הנחה</Label>
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
              <span className="text-muted-foreground">מחיר מקורי</span>
              <span>{formatPrice(totalOriginalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">סכום ההנחה</span>
              <span className="text-destructive">-{formatPrice(savingsAmount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>מחיר חבילה</span>
              <span>{formatPrice(discountedPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BundlePricingSection;
