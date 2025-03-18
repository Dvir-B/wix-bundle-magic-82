
import { Separator } from "@/components/ui/separator";
import ProductSelector from "@/components/ProductSelector";
import { Product } from "@/components/BundleCard";

interface ProductSelectionSectionProps {
  availableProducts: Product[];
  selectedProducts: Product[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
}

const ProductSelectionSection: React.FC<ProductSelectionSectionProps> = ({
  availableProducts,
  selectedProducts,
  onAddProduct,
  onRemoveProduct
}) => {
  return (
    <>
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">מוצרים בחבילה</h2>
        <ProductSelector
          availableProducts={availableProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={onAddProduct}
          onRemoveProduct={onRemoveProduct}
        />
      </div>
    </>
  );
};

export default ProductSelectionSection;
