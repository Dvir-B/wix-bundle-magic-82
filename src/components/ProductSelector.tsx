
import { useState } from "react";
import { Search, X, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Product } from "./BundleCard";

interface ProductSelectorProps {
  availableProducts: Product[];
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  availableProducts,
  selectedProducts,
  onSelectProduct,
  onRemoveProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = availableProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedProducts.some(p => p.id === product.id)
  );

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-wixDarkGray" />
        <Input
          type="search"
          placeholder="חפש מוצרים..."
          className="pr-9 text-right"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute left-2.5 top-2.5 text-wixDarkGray hover:text-wixDarkBlue"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">מוצרים שנבחרו</h3>
        <div className="min-h-12 p-4 border border-wixGray rounded-md flex flex-wrap gap-2">
          {selectedProducts.length === 0 ? (
            <span className="text-sm text-wixDarkGray">לא נבחרו מוצרים</span>
          ) : (
            selectedProducts.map(product => (
              <Badge 
                key={product.id} 
                variant="secondary"
                className="py-1.5 pl-2 pr-1 gap-1 flex items-center bg-wixLightBlue text-wixBlue border-0"
              >
                <span className="truncate max-w-40">{product.name}</span>
                <button 
                  onClick={() => onRemoveProduct(product.id)}
                  className="mr-1 text-wixBlue hover:text-wixDarkBlue rounded-full"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">מוצרים זמינים</h3>
        <div className="max-h-80 overflow-y-auto border border-wixGray rounded-md divide-y divide-wixGray">
          {filteredProducts.length === 0 ? (
            <div className="p-4 text-sm text-center text-wixDarkGray">
              {searchQuery ? "לא נמצאו מוצרים התואמים את החיפוש" : "אין מוצרים זמינים"}
            </div>
          ) : (
            filteredProducts.map(product => (
              <div 
                key={product.id}
                className="p-3 flex items-center gap-3 hover:bg-wixGray/50 transition-colors"
              >
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-wixGray">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-medium truncate text-wixDarkBlue">{product.name}</h4>
                  <p className="text-xs text-wixDarkGray">{formatPrice(product.price)}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="flex-shrink-0 h-8 w-8 p-0 text-wixBlue hover:bg-wixLightBlue hover:text-wixBlue"
                  onClick={() => onSelectProduct(product)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;
