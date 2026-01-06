import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

type StockCardProps = {
  stockName: string;
};

export function StockCard({ stockName }: StockCardProps) {  
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-white m-2">{stockName}</h3>
      </CardContent>
    </Card>
  );
}
