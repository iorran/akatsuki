"use server";

import { revalidatePath } from "next/cache";

export async function saveRemarketingNotes(data: Record<string, any>): Promise<{ error?: string }> {
  const { content, tattooId } = data;


  revalidatePath("/");

  return {};
}