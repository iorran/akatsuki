import { z } from "zod";
import { afterProcedureSchema, beforeProcedureSchema, healthSchema, unifiedSchema } from "../schema";

export const labels: Partial<Record<keyof z.output<typeof unifiedSchema>, string>> = {
    name: "Nome",
    email: "Email",
    phone: "Telemóvel",
    document: "Documento",
    birthday: "Data de Nascimento",
    whereFoundUs: "Onde nos encontrou?",
    healthQ1: 'Indique se há diagnóstico positivo para Hepatite B e C, HIV/AIDS, sífilis, tuberculose, herpes, eczema, psoríase, acne, rosácea, diabetes, distúrbios de coagulação sanguínea, problemas cardíacos, doenças autoimunes, câncer, epilepsia, gravidez, queloide, anemia, hemofilia ou doença autoimune, vitiligo.',
    healthQ2: 'Você já teve alguma reação alérgica a pigmentos de tatuagem ou outras tintas?',
    healthQ3: 'Você está tomando algum medicamento que possa afetar a cicatrização?',
    healthQ4: 'Você está sob tratamento médico atual ou possui alguma condição de saúde que deva ser informada?',
    beforeProcedureRQ1: 'Afirmo ter conferido todos os detalhes da tatuagem (posição, grafia, datas, desenho, etc). Estou ciente de que a tatuagem é um processo artístico.',
    beforeProcedureRQ2: 'Não fiz uso de nenhum anestésico e estou ciente que caso seja descoberto o uso durante o procedimento, o mesmo será interrompido sem devolução do valor pago.',
    beforeProcedureRQ3: 'Confirmo ter mais de 18 Anos.',
    beforeProcedureRQ4: 'Afirmo ter ciência de há câmeras no ambiente laboral e autorizo a gravação de minha imagem.',
    art: 'Desenho',
    bodyPart: 'Parte do corpo',
    price: 'Preço',
    afterProcedureRQ1: 'Comprometo-me a seguir as instruções repassadas pelo profissional, a fim de que a cicatrização seja a melhor possível, estando ciente de que cada pessoa possui um tempo específico e próprio de reação.',
    afterProcedureRQ2: 'Estou ciente de que qualquer problema com a minha tatuagem deve ser tratado diretamente com o tatuador.',
    afterProcedureRQ3: 'Autorizo a veiculação do trabalho executado através meio de comunicação isentando-o de qualquer bônus e/ou ônus advindo da exposição da imagem e qualquer processo decorrente.',
    artistSignature: 'Assinatura do artista',
    clientSignature: 'Assinatura do cliente',
};

export const HEALTH_QUESTIONS: { name: keyof z.output<typeof healthSchema>, label: string, textAreaName: keyof z.output<typeof healthSchema> }[] = [
    {
        name: 'healthRQ1',
        label: labels.healthQ1!,
        textAreaName: 'healthQ1',
    },
    {
        name: 'healthRQ2',
        label: labels.healthQ2!,
        textAreaName: 'healthQ2',
    },
    {
        name: 'healthRQ3',
        label: labels.healthQ3!,
        textAreaName: 'healthQ3',
    },
    {
        name: 'healthRQ4',
        label: labels.healthQ4!,
        textAreaName: 'healthQ4',
    }
];

export const BEFORE_PROCEDURE_QUESTIONS: { name: keyof z.output<typeof beforeProcedureSchema>, label: string }[] = [
    {
        name: 'beforeProcedureRQ1',
        label: labels.beforeProcedureRQ1!,
    },
    {
        name: 'beforeProcedureRQ2',
        label: labels.beforeProcedureRQ2!,
    },
    {
        name: 'beforeProcedureRQ3',
        label: labels.beforeProcedureRQ3!,
    },
    {
        name: 'beforeProcedureRQ4',
        label: labels.beforeProcedureRQ4!,
    }
];

export const AFTER_PROCEDURE_QUESTIONS: { name: keyof z.output<typeof afterProcedureSchema>, label: string }[] = [
    {
        name: 'afterProcedureRQ1',
        label: labels.afterProcedureRQ1!,
    },
    {
        name: 'afterProcedureRQ2',
        label: labels.afterProcedureRQ2!,
    },
    {
        name: 'afterProcedureRQ3',
        label: labels.afterProcedureRQ3!,
    },
];