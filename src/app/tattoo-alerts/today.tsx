import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "../../lib/supabase/server"
import { Timer } from "lucide-react";
import { endOfToday, startOfToday } from "date-fns";

export const Today = async () => {
    const supabase = createClient();
    const start = startOfToday();
    const end = endOfToday();
    const tattos = await supabase
        .from('tattoo')
        .select('*')
        .gte('createdAt', start.toISOString())
        .lte('createdAt', end.toISOString());

    return (
        <div className="space-y-2">
            {tattos.data?.map(tatoo => {
                return (
                    <Alert>
                        <Timer className="h-4 w-4" />
                        <AlertTitle>{tatoo.name}</AlertTitle>
                        <AlertDescription>
                            {tatoo.email} - {tatoo.phone}
                        </AlertDescription>
                    </Alert>
                )
            })}
        </div>
    )
}