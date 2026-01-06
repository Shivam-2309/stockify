import { Card, CardContent } from "@/components/ui/card";

type StockCardProps = {
  stockName: string;
};

export function StockCard({ stockName }: StockCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-white">{stockName}</h3>
      </CardContent>
    </Card>
  );
}
