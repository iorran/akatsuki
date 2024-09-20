import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { LoadingSkeleton, TattooAlerts } from "./tattoo-alerts/tattoo-alerts";
import { NewTattooDialog } from "./new-tattoo/dialog";
import { endOfToday, startOfToday, subDays, subMonths, subWeeks } from "date-fns";
import { Suspense } from "react";

export default function Home() {
  return (
    <Tabs defaultValue="today">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="days">2 Dias</TabsTrigger>
          <TabsTrigger value="weeks">2 Semanas</TabsTrigger>
          <TabsTrigger value="months">2 Meses</TabsTrigger>
        </TabsList>
        <NewTattooDialog />
      </div>
      <TabsContent value="today">
        <Suspense fallback={<LoadingSkeleton />}>
          <TattooAlerts period="today" />
        </Suspense>
      </TabsContent>
      <TabsContent value="days">
        <Suspense fallback={<LoadingSkeleton />}>
          <TattooAlerts period="days" />
        </Suspense>
      </TabsContent>
      <TabsContent value="weeks">
        <Suspense fallback={<LoadingSkeleton />}>
          <TattooAlerts period="weeks" />
        </Suspense>
      </TabsContent>
      <TabsContent value="months">
        <Suspense fallback={<LoadingSkeleton />}>
          <TattooAlerts period="months" />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}