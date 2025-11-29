import { useState } from "react";
import { Package, Search, Plus, Barcode, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ScannerInput from "@/components/ScannerInput";
import ProductList from "@/components/ProductList";
import AddProductDialog from "@/components/AddProductDialog";
import EditProductDialog from "@/components/EditProductDialog";
import DeleteProductDialog from "@/components/DeleteProductDialog";
import { toast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  barcode: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lastUpdated: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      barcode: "8934673010047",
      name: "Nước suối Lavie 500ml",
      category: "Đồ uống",
      price: 5000,
      stock: 150,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "2",
      barcode: "8934673032056",
      name: "Bánh Oreo 137g",
      category: "Snack",
      price: 18000,
      stock: 45,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "3",
      barcode: "8934673001458",
      name: "Mì Hảo Hảo Tôm Chua Cay",
      category: "Thực phẩm khô",
      price: 3500,
      stock: 200,
      lastUpdated: new Date().toISOString(),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleScan = (barcode: string) => {
    const product = products.find((p) => p.barcode === barcode);
    if (product) {
      toast({
        title: "Tìm thấy sản phẩm",
        description: `${product.name} - Còn ${product.stock} sản phẩm`,
      });
    } else {
      toast({
        title: "Không tìm thấy",
        description: "Sản phẩm chưa có trong hệ thống",
        variant: "destructive",
      });
    }
  };

  const handleAddProduct = (product: Omit<Product, "id" | "lastUpdated">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Thành công",
      description: "Đã thêm sản phẩm mới",
    });
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast({
      title: "Cập nhật thành công",
      description: `Đã cập nhật thông tin ${updatedProduct.name}`,
    });
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      toast({
        title: "Đã xóa",
        description: `Đã xóa ${selectedProduct.name} khỏi hệ thống`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Quản lý sản phẩm</h1>
                <p className="text-sm text-muted-foreground">Quét mã vạch và quản lý kho</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/reports">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Báo cáo
                </Button>
              </Link>
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Scanner Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Barcode className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Quét mã vạch</h2>
          </div>
          <ScannerInput onScan={handleScan} />
        </Card>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, mã vạch, danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Tổng sản phẩm</div>
            <div className="text-2xl font-bold text-primary mt-1">{products.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Tổng tồn kho</div>
            <div className="text-2xl font-bold text-accent mt-1">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Giá trị kho</div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {(products.reduce((sum, p) => sum + p.price * p.stock, 0) / 1000).toFixed(0)}K
            </div>
          </Card>
        </div>

        {/* Product List */}
        <ProductList 
          products={filteredProducts}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      </main>

      {/* Add Product Dialog */}
      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddProduct}
      />

      {/* Edit Product Dialog */}
      <EditProductDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEdit={handleEditProduct}
        product={selectedProduct}
      />

      {/* Delete Product Dialog */}
      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;
