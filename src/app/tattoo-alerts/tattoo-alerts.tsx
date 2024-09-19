import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "../../lib/supabase/server"
import { Timer } from "lucide-react";

export const TattooAlerts = async ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
    console.log(`endDate:`, endDate)
    console.log(`startDate:`, startDate)
    const supabase = createClient();

    const tattoos = await supabase
        .from("tattoo")
        .select('*')
        .gte('createdAt', startDate.toISOString())
        .lte('createdAt', endDate.toISOString());

    return (
        <div className="space-y-2">
            {tattoos.data?.map(tattoo => (
                <Alert key={tattoo.id}>
                    <Timer className="h-4 w-4" />
                    <AlertTitle>{tattoo.name}</AlertTitle>
                    <AlertDescription>
                        {tattoo.email} - {tattoo.phone}
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    );
};