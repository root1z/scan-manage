import { ArrowLeft, TrendingUp, Package, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu mẫu cho biểu đồ doanh thu theo thời gian
const revenueData = [
  { date: "01/11", revenue: 2400000, target: 2000000 },
  { date: "05/11", revenue: 3200000, target: 2500000 },
  { date: "10/11", revenue: 2800000, target: 2800000 },
  { date: "15/11", revenue: 3900000, target: 3200000 },
  { date: "20/11", revenue: 4200000, target: 3500000 },
  { date: "25/11", revenue: 3800000, target: 3800000 },
  { date: "29/11", revenue: 4500000, target: 4000000 },
];

// Dữ liệu mẫu cho tồn kho theo danh mục
const stockData = [
  { category: "Đồ uống", stock: 350, value: 1750000 },
  { category: "Snack", stock: 245, value: 4410000 },
  { category: "Thực phẩm khô", stock: 580, value: 2030000 },
  { category: "Bánh kẹo", stock: 420, value: 7560000 },
  { category: "Gia vị", stock: 180, value: 1260000 },
];

// Dữ liệu mẫu cho xu hướng tồn kho theo thời gian
const stockTrendData = [
  { date: "Tuần 1", stock: 1250 },
  { date: "Tuần 2", stock: 1380 },
  { date: "Tuần 3", stock: 1520 },
  { date: "Tuần 4", stock: 1775 },
];

const Reports = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalStock = stockData.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = stockData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-xl p-2">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Báo cáo & Thống kê</h1>
                  <p className="text-sm text-muted-foreground">Phân tích doanh thu và tồn kho</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Tháng 11/2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Tổng doanh thu</div>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12.5% so với tháng trước</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Tổng tồn kho</div>
              <Package className="h-5 w-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-accent">{totalStock}</div>
            <p className="text-xs text-muted-foreground mt-1">5 danh mục sản phẩm</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-foreground/10 to-foreground/5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Giá trị kho</div>
              <TrendingUp className="h-5 w-5 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              {(totalValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">Giá trị hàng tồn</p>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="stock">Tồn kho</TabsTrigger>
            <TabsTrigger value="trend">Xu hướng</TabsTrigger>
          </TabsList>

          {/* Revenue Chart */}
          <TabsContent value="revenue" className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Doanh thu theo thời gian</h3>
                <p className="text-sm text-muted-foreground">So sánh với mục tiêu</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis 
                    className="text-xs" 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString('vi-VN')}đ`, '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Doanh thu"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Mục tiêu"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Stock Chart */}
          <TabsContent value="stock" className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Tồn kho theo danh mục</h3>
                <p className="text-sm text-muted-foreground">Số lượng và giá trị</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="category" className="text-xs" />
                  <YAxis 
                    yAxisId="left" 
                    className="text-xs"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    className="text-xs"
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="stock"
                    name="Số lượng"
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="value"
                    name="Giá trị (đ)"
                    fill="hsl(var(--accent))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Trend Chart */}
          <TabsContent value="trend" className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Xu hướng tồn kho</h3>
                <p className="text-sm text-muted-foreground">Biến động theo tuần</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={stockTrendData}>
                  <defs>
                    <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="stock"
                    name="Tồn kho"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorStock)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;
