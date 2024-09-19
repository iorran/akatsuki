import { MonthAgo } from "./tattoo-alerts/month-ago";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

import { Button } from "@/components/ui/button";
import { WeekAgo } from "./tattoo-alerts/week-ago";
import { DayAgo } from "./tattoo-alerts/day-ago";
import { Today } from "./tattoo-alerts/today";
import { NewTattooDialog } from "./new-tattoo/dialog";

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
          <Today />
        </TabsContent>
        <TabsContent value="days">
          <DayAgo />
        </TabsContent>
        <TabsContent value="weeks">
          <WeekAgo />
        </TabsContent>
        <TabsContent value="months">
          <MonthAgo />
        </TabsContent>
      </Tabs>
    </div>
  );
}