
import { Package, DollarSign } from "lucide-react";
import { Product } from "@/components/BundleCard";
import { calculateDiscountedPrice, calculateSavings } from "@/utils/bundleUtils";

interface BundleSummaryProps {
  bundleName: string;
  selectedProducts: Product[];
  discountPercentage: number;
  isActive: boolean;
}

const BundleSummary: React.FC<BundleSummaryProps> = ({
  bundleName,
  selectedProducts,
  discountPercentage,
  isActive
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
    <div className="bg-accent/50 rounded-lg p-6 sticky top-28">
      <h3 className="font-medium mb-4">סיכום חבילה</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">שם</div>
          <div className="font-medium">
            {bundleName || "חבילה ללא שם"}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">מוצרים</div>
          <div className="flex items-center gap-1">
            <Package size={16} />
            <span className="font-medium">{selectedProducts.length}</span>
            <span className="text-sm text-muted-foreground">
              מוצרים נבחרו
            </span>
          </div>
        </div>
        
        {selectedProducts.length > 0 && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">תמחור</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">מחיר מקורי:</span>
                <span className="font-medium">{formatPrice(totalOriginalPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">הנחה:</span>
                <span className="font-medium text-destructive">-{discountPercentage}%</span>
              </div>
              <div className="flex items-center justify-between border-t border-border mt-1 pt-1">
                <span className="text-sm font-semibold">מחיר חבילה:</span>
                <span className="font-semibold">{formatPrice(discountedPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-green-600 text-xs">
                <span>חיסכון ללקוח:</span>
                <span>{formatPrice(savingsAmount)}</span>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">סטטוס</div>
          <div className={`font-medium ${isActive ? "text-green-600" : "text-muted-foreground"}`}>
            {isActive ? "פעיל" : "לא פעיל"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleSummary;
