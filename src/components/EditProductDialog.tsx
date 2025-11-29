import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/pages/Index";

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (product: Product) => void;
  product: Product | null;
}

const EditProductDialog = ({ open, onOpenChange, onEdit, product }: EditProductDialogProps) => {
  const [formData, setFormData] = useState({
    barcode: "",
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        barcode: product.barcode,
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    onEdit({
      ...product,
      barcode: formData.barcode,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      lastUpdated: new Date().toISOString(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Chỉnh sửa sản phẩm
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin sản phẩm trong hệ thống
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-barcode">Mã vạch *</Label>
            <Input
              id="edit-barcode"
              placeholder="VD: 8934673010047"
              value={formData.barcode}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
              className="barcode-font"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-name">Tên sản phẩm *</Label>
            <Input
              id="edit-name"
              placeholder="VD: Nước suối Lavie 500ml"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Danh mục *</Label>
            <Input
              id="edit-category"
              placeholder="VD: Đồ uống"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Giá bán (VNĐ) *</Label>
              <Input
                id="edit-price"
                type="number"
                placeholder="VD: 5000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Tồn kho *</Label>
              <Input
                id="edit-stock"
                type="number"
                placeholder="VD: 150"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">Cập nhật</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
