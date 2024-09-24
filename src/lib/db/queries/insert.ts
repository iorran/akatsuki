import { db } from '../index';
import { InsertTattoo, tattooTable } from '../schema';

export async function createTattoo(data: InsertTattoo) {
  await db.insert(tattooTable).values(data);
}