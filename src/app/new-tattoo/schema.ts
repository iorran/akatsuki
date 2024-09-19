import { z } from "zod";

export const personalInformationSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome obrigatório",
  }),
  email: z.string().trim().email({
    message: "Email inválido",
  }),
  phone: z.string().trim().min(1, {
    message: "Telemóvel obrigatório",
  }),
  document: z.string().trim().min(1, {
    message: "Documento obrigatório",
  }),
  birthday: z.date(),
  whereFoundUs: z.string().trim(),
});

const healthSchemaObject = z.object({
  healthRQ1: z.enum(['Sim', 'Nao']),
  healthQ1: z.string().optional(),
  healthRQ2: z.enum(['Sim', 'Nao']),
  healthQ2: z.string().optional(),
  healthRQ3: z.enum(['Sim', 'Nao']),
  healthQ3: z.string().optional(),
  healthRQ4: z.enum(['Sim', 'Nao']),
  healthQ4: z.string().optional(),
});

export const healthSchema = healthSchemaObject.superRefine((data, ctx) => {
  if (data.healthRQ1 === 'Sim' && !data.healthQ1) {
    ctx.addIssue({
      code: 'custom',
      path: ['healthQ1'],
      message: "Este campo é obrigatório quando 'Sim' é selecionado.",
    });
  }
  if (data.healthRQ2 === 'Sim' && !data.healthQ2) {
    ctx.addIssue({
      code: 'custom',
      path: ['healthQ2'],
      message: "Este campo é obrigatório quando 'Sim' é selecionado.",
    });
  }
  if (data.healthRQ3 === 'Sim' && !data.healthQ3) {
    ctx.addIssue({
      code: 'custom',
      path: ['healthQ3'],
      message: "Este campo é obrigatório quando 'Sim' é selecionado.",
    });
  }
  if (data.healthRQ4 === 'Sim' && !data.healthQ4) {
    ctx.addIssue({
      code: 'custom',
      path: ['healthQ4'],
      message: "Este campo é obrigatório quando 'Sim' é selecionado.",
    });
  }
});

export const beforeProcedureSchema = z.object({
  beforeProcedureRQ1: z.enum(['Sim', 'Nao']).refine(val => val === 'Sim', {
    message: "Você deve selecionar 'Sim' para continuar.",
  }),
  beforeProcedureRQ2: z.enum(['Sim', 'Nao']).refine(val => val === 'Sim', {
    message: "Você deve selecionar 'Sim' para continuar.",
  }),
  beforeProcedureRQ3: z.enum(['Sim', 'Nao']).refine(val => val === 'Sim', {
    message: "Você deve selecionar 'Sim' para continuar.",
  }),
  beforeProcedureRQ4: z.enum(['Sim', 'Nao']).refine(val => val === 'Sim', {
    message: "Você deve selecionar 'Sim' para continuar.",
  }),
});

export const afterProcedureObject = z.object({
  afterProcedureRQ1: z.boolean({ required_error: "Você deve aceitar para continuar." }),
  afterProcedureRQ2: z.boolean({ required_error: "Você deve aceitar para continuar." }),
  afterProcedureRQ3: z.boolean().optional(),
});

export const afterProcedureSchema = afterProcedureObject.superRefine((data, ctx) => {
  if (!data.afterProcedureRQ1) {
    ctx.addIssue({
      code: 'custom',
      path: ['afterProcedureRQ1'],
      message: "Você deve aceitar para continuar.",
    });
  }
  if (!data.afterProcedureRQ2) {
    ctx.addIssue({
      code: 'custom',
      path: ['afterProcedureRQ2'],
      message: "Você deve aceitar para continuar.",
    });
  }
});

export const unifiedSchema = personalInformationSchema
  .merge(healthSchemaObject)
  .merge(beforeProcedureSchema)
  .merge(afterProcedureObject);