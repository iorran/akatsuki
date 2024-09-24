"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuActions } from "./action-buttons/menu-actions"
import { AddNote } from "./action-buttons/add-note"
import { Done } from "./action-buttons/done"
import { WhatsAppButton } from "./action-buttons/whatsapp-button"
import Link from "next/link";

export const TattooCard = ({ tattoo }: any) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <Link className="space-y-2" href={`/tattoo/${tattoo.id}`}>
                    <CardTitle>{tattoo.name}</CardTitle>
                    <CardDescription>
                        {tattoo.email}
                    </CardDescription>
                </Link>
                <div className="flex flex-row items-center gap-4">
                    <Done phone={tattoo.phone} />
                    <AddNote id={tattoo.id} />
                    <WhatsAppButton phone={tattoo.phone} />
                    <MenuActions tattoo={tattoo} />
                </div>
            </CardHeader>
        </Card>
    )
}