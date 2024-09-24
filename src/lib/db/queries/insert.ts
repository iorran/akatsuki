import { eq } from 'drizzle-orm';
import { db } from '../index';
import { InsertTattoo, tattooTable, UpdateTattoo } from '../schema';

export async function createTattoo(data: InsertTattoo) {
  await db.insert(tattooTable).values(data);
}

export async function updateTattooById(id: number, data: UpdateTattoo) {
  try {
    const updatedTattoo = await db
      .update(tattooTable)
      .set(data)
      .where(eq(tattooTable.id, id))
      .returning(); 

    if (updatedTattoo.length === 0) {
      return null;
    }

    return updatedTattoo[0];
  } catch (error) {
    console.error(`Error updating tattoo with ID ${id}:`, error);
    throw new Error('Failed to update tattoo.');
  }
}