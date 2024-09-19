import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "../../lib/supabase/server"
import { Timer } from "lucide-react";
import { subWeeks } from "date-fns";

export const WeekAgo = async () => {
    const supabase = createClient();
    const tattos = await supabase
        .from("tattoo")
        .select('*')
        .lte('createdAt', subWeeks(new Date(), 2).toISOString());

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