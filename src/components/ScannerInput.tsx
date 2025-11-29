import { useState } from "react";
import { Scan } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ScannerInputProps {
  onScan: (barcode: string) => void;
}

const ScannerInput = ({ onScan }: ScannerInputProps) => {
  const [barcode, setBarcode] = useState("");

  const handleScan = () => {
    if (barcode.trim()) {
      onScan(barcode.trim());
      setBarcode("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Nhập hoặc quét mã vạch..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyPress={handleKeyPress}
          className="barcode-font text-lg h-12 pr-12"
          autoFocus
        />
        <Scan className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      </div>
      <Button 
        onClick={handleScan} 
        size="lg"
        className="h-12 px-8 gap-2"
      >
        <Scan className="h-4 w-4" />
        Quét
      </Button>
    </div>
  );
};

export default ScannerInput;
