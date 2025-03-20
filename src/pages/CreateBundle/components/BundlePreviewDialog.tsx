
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { calculateDiscountedPrice } from "@/utils/bundleUtils";
import { Bundle, Product } from "@/components/BundleCard";

interface BundlePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundle: Bundle;
  currencySymbol: string;
}

const BundlePreviewDialog: React.FC<BundlePreviewDialogProps> = ({
  open,
  onOpenChange,
  bundle,
  currencySymbol
}) => {
  const totalOriginalPrice = bundle.products.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const discountedPrice = calculateDiscountedPrice(bundle.products, bundle.discountPercentage);
  
  const formatPrice = (price: number) => `${currencySymbol}${price.toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bundle Preview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h2 className="text-xl font-semibold">{bundle.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {bundle.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={bundle.active ? "default" : "outline"}>
              {bundle.active ? "Active" : "Inactive"}
            </Badge>
            {bundle.discountPercentage > 0 && (
              <Badge variant="secondary">
                {bundle.discountPercentage}% Discount
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Products Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bundle.products.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Original Price:</span>
              <span>{formatPrice(totalOriginalPrice)}</span>
            </div>
            {bundle.discountPercentage > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount ({bundle.discountPercentage}%):</span>
                <span>-{formatPrice(totalOriginalPrice - discountedPrice)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-lg mt-2">
              <span>Bundle Price:</span>
              <span>{formatPrice(discountedPrice)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close Preview</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BundlePreviewDialog;
