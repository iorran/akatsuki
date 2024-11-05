"use server";

import { updateTattooById } from "@/lib/db/queries/insert";
import { revalidatePath } from "next/cache";
import { Period } from "@/app/(admin)/tattoo-alerts/tattoo-alerts";
import { differenceInDays } from "date-fns";
import { DAYS, MONTH_IN_DAYS, WEEK_IN_DAYS } from "@/lib/constants";

export async function saveRemarketingNotes(data: Record<string, any>): Promise<{ error?: string }> {
    const { notes, id } = data;

    try {
        await updateTattooById(id, { notes });
    } catch (e) {
        return { error: e as string };
    }

    revalidatePath("/");

    return {};
}

export async function markAsDone(data: Record<string, any>, period: Period | undefined): Promise<{ error?: string }> {
    const { id, createdAt } = data;

    try {
        switch (period) {
            case "days":
                await updateTattooById(id, { message2Days: 'true' });
                break;
            case "weeks":
                await updateTattooById(id, { message2Weeks: 'true' });
                break;
            case "months":
                await updateTattooById(id, { message2Months: 'true' });
                break;
            case undefined:
                const now = new Date();
                const daysPassed = differenceInDays(now, createdAt);
                console.debug(`Days passed: ${ daysPassed }`);
                if (daysPassed >= MONTH_IN_DAYS) {
                    console.debug(`Marcando "todas" as mensagens como enviadas`);
                    await updateTattooById(id, { message2Days: 'true', message2Weeks: 'true', message2Months: 'true' });
                }
                if (daysPassed >= WEEK_IN_DAYS && daysPassed < MONTH_IN_DAYS) {
                    console.debug(`Marcando mensagens de "dia" e "semana" como enviadas`);
                    await updateTattooById(id, { message2Days: 'true', message2Weeks: 'true'});
                }
                if (daysPassed >= DAYS && daysPassed < WEEK_IN_DAYS) {
                    console.debug(`Marcando mensagens de "dia" como enviada`);
                    await updateTattooById(id, { message2Days: 'true', message2Weeks: 'true'});
                }
                break;
        }
    } catch (e) {
        return { error: e as string };
    }

    revalidatePath("/");

    return {};
}