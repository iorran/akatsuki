import { Chart } from "./bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMonthsAndPrices } from "@/lib/db/queries/select";
import { format } from "date-fns";

export default async function Dashboard() {
  const groupByMotnh = (data: any) => {
    const result = data.reduce((acc: any, { month, price }: any) => {
      const priceValue = parseFloat(price);
      if (!acc[month]) {
        acc[month] = 0; 
      }
      acc[month] += priceValue;
      return acc;
    }, {});

    const groupedResult = Object.entries(result).map(([month, totalPrice]) => ({
      month: format(month, 'MMMM'),
      totalPrice
    }));

    return groupedResult;
  }

  try {
    const amount = await getMonthsAndPrices();
    if (!amount || amount.length === 0) {
      return <p className="text-red-500">No tattoo data found.</p>;
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rendimentos</CardTitle>
          <CardDescription>Atualmente todos os meses</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={groupByMotnh(amount)} />
        </CardContent>
      </Card>
    );
  } catch (error) {
    return <p className="text-red-500">{JSON.stringify(error)}</p>;
  }
}