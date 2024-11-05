"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuActions } from "./action-buttons/menu-actions"
import { AddNote } from "./action-buttons/add-note"
import { Done } from "./action-buttons/done"
import { WhatsAppButton } from "./action-buttons/whatsapp-button"
import Link from "next/link";
import { Tattoo } from "@/lib/db/queries/select";
import { Period } from "./tattoo-alerts";
import { differenceInDays, format } from "date-fns";
import { DAYS, MONTH_IN_DAYS, WEEK_IN_DAYS } from "@/lib/constants";
import { updateTattooById } from "@/lib/db/queries/insert";

interface TattooCardProps {
    tattoo: Tattoo;
    period?: Period;
    showDate?: boolean;
}

export const TattooCard = ({ tattoo, period, showDate = false }: TattooCardProps) => {
    const now = new Date();
    const daysPassed = differenceInDays(now, tattoo.createdAt);
    let border = "border-2 border-amber-200"
    if (daysPassed >= MONTH_IN_DAYS) {
        border = "border-2 border-red-600"
    }
    if (daysPassed >= WEEK_IN_DAYS && daysPassed < MONTH_IN_DAYS) {
        border = "border-2 border-amber-500"
    }
    return (
        <Card className={ border }>
            <CardHeader className="flex flex-row items-center justify-between">
                <Link className="space-y-2" href={ `/tattoo/${ tattoo.id }` }>
                    <CardTitle>{ tattoo.name }</CardTitle>
                    <CardDescription className="flex flex-col">
                        <span>
                            { tattoo.email }
                        </span>
                        { showDate ? (<span>
                            Tatuado em: { format(tattoo.createdAt, 'dd/MM/yyyy') } - <span className="font-extrabold text-lg">{daysPassed} dias</span>
                        </span>) : null }
                    </CardDescription>
                </Link>
                <div className="flex flex-row items-center gap-4">
                    { period !== 'today' ? <Done tattoo={ tattoo } period={ period } /> : null }
                    <AddNote tattoo={ tattoo } />
                    <WhatsAppButton phone={ tattoo.phone } />
                    { period === 'today' && !period ? <MenuActions tattoo={ tattoo } /> : null }
                </div>
            </CardHeader>
        </Card>
    )
}