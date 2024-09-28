"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuActions } from "./action-buttons/menu-actions"
import { AddNote } from "./action-buttons/add-note"
import { Done } from "./action-buttons/done"
import { WhatsAppButton } from "./action-buttons/whatsapp-button"
import Link from "next/link";
import { Tattoo } from "@/lib/db/queries/select";
import { Period } from "./tattoo-alerts";
import { format } from "date-fns";

interface TattooCardProps {
    tattoo: Tattoo;
    period?: Period;
    showDate?: boolean;
}

export const TattooCard = ({ tattoo, period, showDate =false }: TattooCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <Link className="space-y-2" href={`/tattoo/${tattoo.id}`}>
                    <CardTitle>{tattoo.name}</CardTitle>
                    <CardDescription className="flex flex-col">
                        <div>
                            {tattoo.email}
                        </div>
                        {showDate ? (<div>
                            Tatuado em: {format(tattoo.createdAt, 'dd/MM/yyyy')}
                        </div>): null}
                    </CardDescription>
                </Link>
                <div className="flex flex-row items-center gap-4">
                    {period !== 'today' ? <Done phone={tattoo.phone} /> : null}
                    <AddNote tattoo={tattoo} />
                    <WhatsAppButton phone={tattoo.phone} />
                    {period === 'today' && !period ? <MenuActions tattoo={tattoo} /> : null}
                </div>
            </CardHeader>
        </Card>
    )
}