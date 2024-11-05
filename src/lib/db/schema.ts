import { boolean, date, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const tattooTable = pgTable('tattoo', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  document: text('document').notNull(),
  birthday: date('birthday').notNull(),
  whereFoundUs: text('whereFoundUs'),

  healthRQ1: text('healthRQ1').notNull(),
  healthQ1: text('healthQ1'),
  healthRQ2: text('healthRQ2').notNull(),
  healthQ2: text('healthQ2'),
  healthRQ3: text('healthRQ3').notNull(),
  healthQ3: text('healthQ3'),
  healthRQ4: text('healthRQ4').notNull(),
  healthQ4: text('healthQ4'),

  beforeProcedureRQ1: text('beforeProcedureRQ1').notNull(),
  beforeProcedureRQ2: text('beforeProcedureRQ2').notNull(),
  beforeProcedureRQ3: text('beforeProcedureRQ3').notNull(),
  beforeProcedureRQ4: text('beforeProcedureRQ4').notNull(),
  art: text('art').notNull(),
  price: text('price').notNull(),
  bodyPart: text('bodyPart').notNull(),

  afterProcedureRQ1: boolean('afterProcedureRQ1').notNull(),
  afterProcedureRQ2: boolean('afterProcedureRQ2').notNull(),
  afterProcedureRQ3: boolean('afterProcedureRQ3'),

  artistSignature: text('artistSignature').notNull(),
  clientSignature: text('clientSignature').notNull(),

  message2Days: date('message2Days'),
  message2Weeks: date('message2Weeks'),
  message2Months: date('message2Months'),

  notes: text('notes'),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export type InsertTattoo = typeof tattooTable.$inferInsert;
export type UpdateTattoo = Partial<InsertTattoo>;
export type SelectTattoo = typeof tattooTable.$inferSelect;
