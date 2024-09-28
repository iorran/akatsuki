"use server";

import { unifiedSchema } from "./schema";
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function submitForm(data: Record<string, any>): Promise<{ error?: string }> {
  // Validate the data using Zod schema
  const parsed = unifiedSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error?.message };
  }

  // Convert birthday to a Date object
  const birthdayAsDate = new Date(parsed.data.birthday);
  if (isNaN(birthdayAsDate.getTime())) {
    return { error: 'Invalid birthday format.' };
  }

  const supabase = createClient();

  // removing
  if (parsed?.data?.review) {
    delete (parsed.data as Partial<z.output<typeof unifiedSchema>>).review;
}

  // Insert the data into Supabase, including the correctly formatted birthday
  const { error } = await supabase.from("tattoo").insert([{
    ...parsed.data,
    birthday: birthdayAsDate,  // Ensure the birthday is a Date object
  }]);

  console.log(`error:`, error);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");

  return {};
}