
import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Tag, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import AnimatedContainer from "./AnimatedContainer";

export interface ProductVariant {
  id: string;
  attributes?: Record<string, string>;
  choices?: Record<string, string>;
  inStock: boolean;
  quantity: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  variants?: ProductVariant[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  discountPercentage: number;
  active: boolean;
}

interface BundleCardProps {
  bundle: Bundle;
  index: number;
  onEdit: (bundleId: string) => void;
  onDelete: (bundleId: string) => void;
  onToggleActive: (bundleId: string, active: boolean) => void;
}

const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const totalOriginalPrice = bundle.products.reduce(
    (sum, product) => sum + product.price,
    0
  );
  
  const discountAmount = (totalOriginalPrice * bundle.discountPercentage) / 100;
  const discountedPrice = totalOriginalPrice - discountAmount;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <AnimatedContainer 
      delay={index * 100} 
      animation="scale-in"
      className="h-full"
    >
      <Card 
        className={cn(
          "h-full overflow-hidden transition-all duration-300 border",
          isHovered ? "shadow-md" : "shadow-sm",
          bundle.active ? "border-wixGray" : "border-dashed border-wixDarkGray/30"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <Badge 
              variant={bundle.active ? "default" : "outline"}
              className={cn(
                "mb-2", 
                bundle.active ? "bg-wixGreen text-white" : "border-wixDarkGray/40 text-wixDarkGray"
              )}
            >
              {bundle.active ? "פעיל" : "לא פעיל"}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-1 hover:bg-wixGray">
                  <MoreHorizontal size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit(bundle.id)} className="text-wixDarkBlue">
                  <Edit size={14} className="ms-2" />
                  עריכה
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleActive(bundle.id, !bundle.active)} className="text-wixDarkBlue">
                  <Tag size={14} className="ms-2" />
                  {bundle.active ? "השבת" : "הפעל"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(bundle.id)}
                  className="text-wixRed focus:text-wixRed"
                >
                  <Trash2 size={14} className="ms-2" />
                  מחיקה
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <CardTitle className="text-xl font-medium mt-2 line-clamp-1 text-wixDarkBlue">
            {bundle.name}
          </CardTitle>
          
          <div className="flex items-baseline space-x-2 rtl:space-x-reverse mt-1">
            <span className="text-lg font-semibold text-wixDarkBlue">
              {formatPrice(discountedPrice)}
            </span>
            {bundle.discountPercentage > 0 && (
              <span className="text-sm line-through text-wixDarkGray">
                {formatPrice(totalOriginalPrice)}
              </span>
            )}
            {bundle.discountPercentage > 0 && (
              <span className="text-xs text-wixGreen font-medium">
                חיסכון {bundle.discountPercentage}%
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <p className="text-wixDarkGray text-sm line-clamp-2 h-10">
            {bundle.description}
          </p>
          
          <div className="mt-3">
            <div className="flex items-center gap-1 text-sm text-wixDarkGray">
              <Package size={14} />
              <span>{bundle.products.length} מוצרים</span>
            </div>
            
            <div className="mt-3 flex -space-x-3 rtl:space-x-reverse rtl:-space-x-reverse">
              {bundle.products.slice(0, 4).map((product, i) => (
                <div 
                  key={product.id} 
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background"
                  style={{ zIndex: 10 - i }}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {bundle.products.length > 4 && (
                <div 
                  className="relative w-10 h-10 rounded-full bg-wixGray flex items-center justify-center border-2 border-background"
                  style={{ zIndex: 6 }}
                >
                  <span className="text-xs font-medium">
                    +{bundle.products.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="text-xs text-wixDarkGray">
            מזהה: {bundle.id.substring(0, 8)}
          </div>
        </CardFooter>
      </Card>
    </AnimatedContainer>
  );
};

export default BundleCard;
