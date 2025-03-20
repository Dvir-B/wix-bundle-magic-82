
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ProductSelector from "@/components/ProductSelector";
import { Product } from "@/components/BundleCard";

interface ProductSelectionSectionProps {
  form: any; // Using any for now to fix the build error
  availableProducts: Product[];
}

const ProductSelectionSection: React.FC<ProductSelectionSectionProps> = ({
  form,
  availableProducts
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bundle Products</h2>
      <Separator />
      
      <FormField
        control={form.control}
        name="products"
        render={({ field }) => (
          <ProductSelector
            availableProducts={availableProducts}
            selectedProducts={field.value || []}
            onSelectProduct={(product) => {
              const currentProducts = [...(field.value || [])];
              if (!currentProducts.some(p => p.id === product.id)) {
                field.onChange([...currentProducts, product]);
              }
            }}
            onRemoveProduct={(productId) => {
              const currentProducts = [...(field.value || [])];
              field.onChange(currentProducts.filter(p => p.id !== productId));
            }}
          />
        )}
      />
    </div>
  );
};

export default ProductSelectionSection;
