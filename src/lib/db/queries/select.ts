import { eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectTattoo, tattooTable } from '../schema';

export async function getTattooById(id: SelectTattoo['id']) {
  return db
    .select()
    .from(tattooTable)
    .where(eq(tattooTable.id, id));
}

export type Tattoo = Awaited<ReturnType<typeof getTattooById>>[0];