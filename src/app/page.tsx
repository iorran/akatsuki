import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { TattooAlerts } from "./tattoo-alerts/tattoo-alerts";
import { NewTattooDialog } from "./new-tattoo/dialog";
import { endOfToday, startOfToday, subDays, subMonths, subWeeks } from "date-fns";

export default function Home() {
  return (
    <div className="flex flex-col p-8 w-full gap-4">
      <NewTattooDialog />
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="days">2 Dias</TabsTrigger>
          <TabsTrigger value="weeks">2 Semanas</TabsTrigger>
          <TabsTrigger value="months">2 Meses</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <TattooAlerts startDate={startOfToday()} endDate={endOfToday()} />
        </TabsContent>
        <TabsContent value="days">
          <TattooAlerts startDate={subDays(new Date(), 2)} endDate={new Date()} />
        </TabsContent>
        <TabsContent value="weeks">
          <TattooAlerts startDate={subWeeks(new Date(), 2)} endDate={new Date()} />
        </TabsContent>
        <TabsContent value="months">
          <TattooAlerts startDate={subMonths(new Date(), 2)} endDate={new Date()} />
        </TabsContent>
      </Tabs>
    </div>
  );
}