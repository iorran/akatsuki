"use server";

import { createNote } from "@/lib/db/queries/insert";
import { revalidatePath } from "next/cache";

export async function saveRemarketingNotes(data: Record<string, any>): Promise<{ error?: string }> {
  const { content, tattooId } = data;
  await createNote({
    content,
    tattooId,
  })

  revalidatePath("/");

  return {};
}