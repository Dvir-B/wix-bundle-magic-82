
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { calculateDiscountedPrice } from "@/utils/bundleUtils";
import { Product } from "@/components/BundleCard";

interface BundleSummaryProps {
  form: any; // Using any for now to fix the build error
  currencySymbol: string;
}

const BundleSummary: React.FC<BundleSummaryProps> = ({
  form,
  currencySymbol
}) => {
  const bundleName = form.watch("name") || "New Bundle";
  const products = form.watch("products") || [];
  const discountPercentage = form.watch("discountPercentage") || 0;
  const isActive = form.watch("active");
  
  const totalPrice = products.reduce((sum: number, product: Product) => sum + product.price, 0);
  const discountedPrice = calculateDiscountedPrice(products, discountPercentage);
  
  const formatPrice = (price: number) => `${currencySymbol}${price.toFixed(2)}`;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">{bundleName}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
          {discountPercentage > 0 && (
            <Badge variant="secondary">
              {discountPercentage}% Discount
            </Badge>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Products ({products.length})</p>
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No products selected
          </p>
        ) : (
          <div className="space-y-2">
            {products.map((product: Product) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="truncate flex-1">{product.name}</span>
                <span>{formatPrice(product.price)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Original Price:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount:</span>
          <span>-{formatPrice(totalPrice - discountedPrice)}</span>
        </div>
        <div className="flex justify-between font-medium mt-2">
          <span>Bundle Price:</span>
          <span>{formatPrice(discountedPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default BundleSummary;
