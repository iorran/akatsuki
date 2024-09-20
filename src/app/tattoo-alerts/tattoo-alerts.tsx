import { createClient } from "../../lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { format, subDays, subMonths, subWeeks, startOfDay, endOfDay } from "date-fns";
import { WhatsAppButton } from './whatsapp-button';

type Period = 'today' | 'days' | 'months' | 'weeks';

interface TattooAlertsProps {
    period: Period;
}

const BACKEND_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
const FRONTEND_FORMAT = "dd/MM/yyyy";

const PARAMS: Record<Period, { startDate: string, endDate: string, flag?: string }> = {
    today: {
        startDate: format(startOfDay(new Date()), BACKEND_FORMAT),
        endDate: format(endOfDay(new Date()), BACKEND_FORMAT),
    },
    days: {
        startDate: format(startOfDay(subDays(new Date(), 2)), BACKEND_FORMAT),
        endDate: format(endOfDay(subDays(new Date(), 2)), BACKEND_FORMAT),
        flag: 'message2Days'
    },
    weeks: {
        startDate: format(startOfDay(subWeeks(new Date(), 2)), BACKEND_FORMAT),
        endDate: format(endOfDay(subWeeks(new Date(), 2)), BACKEND_FORMAT),
        flag: 'message2Weeks'
    },
    months: {
        startDate: format(startOfDay(subMonths(new Date(), 2)), BACKEND_FORMAT),
        endDate: format(endOfDay(subMonths(new Date(), 2)), BACKEND_FORMAT),
        flag: 'message2Months'
    },
};

export const TattooAlerts = async ({ period }: TattooAlertsProps) => {
    const supabase = createClient();

    try {
        let query = supabase
            .from("tattoo")
            .select('*')
            .gt('createdAt', PARAMS[period].startDate)
            .lt('createdAt', PARAMS[period].endDate);

        if (PARAMS[period].flag) {
            query = query.is(PARAMS[period].flag, null);
        }

        const { data: tattoos, error } = await query;

        if (error || !tattoos || tattoos.length === 0) {
            const message = error
                ? `Failed to fetch tattoo data: ${error.message}`
                : "Você já fez seu dever de casa :)";

            return (
                <div className="flex flex-1 justify-center items-center">
                    <Alert>
                        <AlertTitle>{error ? "Error" : "Nada por aqui!"}</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {tattoos.map((tattoo) => (
                    <Card key={tattoo.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-2">
                                <CardTitle>{tattoo.name}</CardTitle>
                                <CardDescription>
                                    {tattoo.email}
                                </CardDescription>
                            </div>
                            <WhatsAppButton phone={tattoo.phone} />
                        </CardHeader>
                        <CardContent className="text-xs">
                            Tatuado em {format(tattoo.createdAt, FRONTEND_FORMAT)}
                        </CardContent>
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