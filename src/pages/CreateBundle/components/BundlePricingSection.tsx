
import { Percent } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/components/BundleCard";
import { calculateDiscountedPrice, calculateSavings } from "@/utils/bundleUtils";

interface BundlePricingSectionProps {
  form: any; // Using any for now to fix the build error
  products: Product[];
  currencySymbol: string;
}

const BundlePricingSection: React.FC<BundlePricingSectionProps> = ({
  form,
  products,
  currencySymbol
}) => {
  const discountPercentage = form.watch("discountPercentage") || 0;
  
  const totalOriginalPrice = products.reduce(
    (sum, product) => sum + product.price,
    0
  );
  
  const discountedPrice = calculateDiscountedPrice(products, discountPercentage);
  const savingsAmount = calculateSavings(products, discountPercentage);
  
  const formatPrice = (price: number) => `${currencySymbol}${price.toFixed(2)}`;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bundle Pricing</h2>
      <Separator />
      
      <FormField
        control={form.control}
        name="discountPercentage"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between">
              <FormLabel>Discount Percentage</FormLabel>
              <span className="text-sm font-medium">{field.value}%</span>
            </div>
            <FormControl>
              <div className="flex items-center gap-4">
                <Percent size={16} className="text-muted-foreground" />
                <Slider
                  min={0}
                  max={50}
                  step={1}
                  value={[field.value]}
                  onValueChange={(values) => field.onChange(values[0])}
                  className="flex-grow"
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      
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
  );
};

export default BundlePricingSection;
