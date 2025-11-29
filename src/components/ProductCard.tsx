import { Package, Tag, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const stockStatus = product.stock > 50 ? "success" : product.stock > 20 ? "warning" : "destructive";
  const stockLabel = product.stock > 50 ? "Còn hàng" : product.stock > 20 ? "Sắp hết" : "Gần hết";

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-200 hover:border-primary/40 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground barcode-font">
                {product.barcode}
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              {product.category}
            </span>
            <Badge variant={stockStatus === "success" ? "default" : stockStatus === "warning" ? "secondary" : "destructive"}>
              {stockLabel}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">
                {product.price.toLocaleString('vi-VN')}đ
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Tồn kho</div>
              <div className="text-lg font-semibold text-accent flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {product.stock}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
