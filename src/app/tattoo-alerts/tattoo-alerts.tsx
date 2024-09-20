import { createClient } from "../../lib/supabase/server";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { endOfToday, startOfToday, subDays, subMonths, subWeeks } from "date-fns";
import { WhatsAppButton } from './whatsapp-button';

type Period = 'today' | 'days' | 'months' | 'weeks';

interface TattooAlertsProps {
    period: Period;
}

const PARAMS: Record<Period, { startDate: string, endDate: string }> = {
    today: {
        startDate: startOfToday().toISOString(),
        endDate: endOfToday().toISOString(),
    },
    days: {
        startDate: subDays(new Date(), 2).toISOString(),
        endDate: new Date().toISOString(),
    },
    weeks: {
        startDate: subWeeks(new Date(), 2).toISOString(),
        endDate: new Date().toISOString(),
    },
    months: {
        startDate: subMonths(new Date(), 2).toISOString(),
        endDate: new Date().toISOString(),
    },
};

export const TattooAlerts = async ({ period }: TattooAlertsProps) => {
    const supabase = createClient();

    try {
        const { data: tattoos, error } = await supabase
            .from("tattoo")
            .select('*')
            .gte('createdAt', PARAMS[period].startDate)
            .lte('createdAt', PARAMS[period].endDate);

        if (error) {
            return (
                <div className="flex flex-1 justify-center items-center">
                    <Alert>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Failed to fetch tattoo data: {error.message}
                        </AlertDescription>
                    </Alert>
                </div>
            );
        }

        if (!tattoos || tattoos.length === 0) {
            return (
                <div className="flex flex-1 justify-center items-center">
                    <Alert>
                        <AlertTitle>Nada por aqui!</AlertTitle>
                        <AlertDescription>Você já fez seu dever de casa :)</AlertDescription>
                    </Alert>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {tattoos.map((tattoo) => (
                    <Card key={tattoo.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>{tattoo.name}</CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    {tattoo.email}
                                </CardDescription>
                            </div>
                            <WhatsAppButton phone={tattoo.phone} />
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    } catch (err) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <Alert>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Something went wrong while fetching data. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
};

export const LoadingSkeleton = () => {
    return (
        <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
};