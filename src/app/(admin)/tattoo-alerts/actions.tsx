"use server";

import { updateTattooById } from "@/lib/db/queries/insert";
import { revalidatePath } from "next/cache";

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

export async function set2DaysDone(data: Record<string, any>): Promise<{ error?: string }> {
  const { notes, id } = data;

  try {
    await updateTattooById(id, { notes });
  } catch (e) {
    return { error: e as string };
  }

  revalidatePath("/");

  return {};
}