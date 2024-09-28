import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TattooCard } from "./tattoo-card";
import { getPendingTattoos, } from "@/lib/db/queries/select";

export const PendingTasks = async () => {
    try {
        const tattoos = await getPendingTattoos();
        if (!tattoos || tattoos.length === 0) {
          return <p className="text-red-500">No tattoo data found.</p>;
        }

        return (
            <div className="space-y-2">
                <p className="text-foreground font-light">Tatuagens que não foram marcadas como concluídas e não encontram-se nas demais colunas.</p>
                {tattoos.map((tattoo) => (
                    <TattooCard key={tattoo.id} tattoo={tattoo} showDate />
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