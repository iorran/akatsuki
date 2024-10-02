import { sql, eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectTattoo, tattooTable } from '../schema';

export async function getMonthsAndPrices(): Promise<{ month: number; totalPrice: number }[]> {
  const query = sql`
      SELECT
        EXTRACT(MONTH FROM "createdAt") AS month,
        "price"
      FROM
        tattoo
  `;

  try {
    return await db.execute(query);
  } catch (error) {
    console.error('Error executing raw SQL query:', error);
    throw error;
  }
}

export async function getTattooById(id: SelectTattoo['id']) {
  return db
    .select()
    .from(tattooTable)
    .where(eq(tattooTable.id, id));
}

export async function getPendingTattoos() {
  const query = sql<Tattoo>`
  SELECT *
  FROM "tattoo"
  WHERE "message2Days" IS NULL
    AND NOT (
      ( "createdAt" >= DATE_TRUNC('day', NOW()) 
        AND "createdAt" < DATE_TRUNC('day', NOW()) + INTERVAL '1 day' )
      OR
      ( "createdAt" >= DATE_TRUNC('day', NOW() - INTERVAL '2 weeks') 
        AND "createdAt" < DATE_TRUNC('day', NOW() - INTERVAL '2 weeks') + INTERVAL '1 day' )
      OR
      ( "createdAt" >= DATE_TRUNC('day', NOW() - INTERVAL '2 months') 
        AND "createdAt" < DATE_TRUNC('day', NOW() - INTERVAL '2 months') + INTERVAL '1 day' )
    )
`;

  try {
    return await db.execute<Tattoo>(query);
  } catch (error) {
    console.error('Error executing raw SQL query:', error);
    throw error; // Re-throw the error after logging
  }
}

export type Tattoo = Awaited<ReturnType<typeof getTattooById>>[0];