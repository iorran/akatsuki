import React from 'react';
import { Tattoo } from '@/lib/db/queries/select';
import { DataSection } from './data-section';
import { ImageSection } from './image-section';
import { labels } from '../../../(client)/new-tattoo/steps/questions'; // Import the custom labels mapping
import { AccordionSection } from './accordion-section';

interface TattooDetailsProps {
    tattoo: Tattoo
    preview?: boolean
}

const personalDataFields = [
    'name',
    'email',
    'phone',
    'document',
    'birthday',
    'whereFoundUs',
] as const;

const healthDataFields = [
    'healthRQ1',
    'healthQ1',
    'healthRQ2',
    'healthQ2',
    'healthRQ3',
    'healthQ3',
    'healthRQ4',
    'healthQ4',
] as const;

const beforeProcedureDataFields = [
    'beforeProcedureRQ1',
    'beforeProcedureRQ2',
    'beforeProcedureRQ3',
    'beforeProcedureRQ4',
    'art',
    'price',
    'bodyPart',
] as const;

const afterProcedureDataFields = [
    'afterProcedureRQ1',
    'afterProcedureRQ2',
    'afterProcedureRQ3',
] as const;

const signatureDataFields = [
    'artistSignature',
    'clientSignature',
] as const;

export const TattooDetails = ({ tattoo, preview = false }: TattooDetailsProps) => {
    return (
        <div className="flex flex-col space-y-4">
            {JSON.stringify(tattoo)}
            {/* Dados Pessoais Accordion */}
            <DataSection<Tattoo, typeof personalDataFields[number]>
                title="Dados pessoais"
                fields={personalDataFields}
                data={tattoo}
                labels={labels} // Pass custom labels if needed
            />
            {/* Saúde Accordion */}
            <DataSection<Tattoo, typeof healthDataFields[number]>
                title="Saúde"
                fields={healthDataFields}
                data={tattoo}
                labels={labels}
                variant='vertical'
            />
            {/* Antes do procedimento Accordion */}
            <DataSection<Tattoo, typeof beforeProcedureDataFields[number]>
                title="Antes do procedimento"
                fields={beforeProcedureDataFields}
                data={tattoo}
                labels={labels}
                variant='vertical'
            />
            {/* Depois do procedimento Accordion */}
            <DataSection<Tattoo, typeof afterProcedureDataFields[number]>
                title="Depois do procedimento"
                fields={afterProcedureDataFields}
                data={tattoo}
                labels={labels}
                variant='vertical'
            />
            {preview ? null : (
                <>

                    {/* Assinaturas Accordion using ImageSection */}
                    < ImageSection<Tattoo, typeof signatureDataFields[number]>
                        title="Assinaturas"
                        fields={signatureDataFields}
                        data={tattoo}
                        labels={labels}
                    />
                    {/* Insights Accordion */}
                    <AccordionSection
                        title="Insights"
                        value="Insights"
                        content={
                            tattoo.notes ? (
                                <div className="text-foreground whitespace-pre-line">
                                    {tattoo.notes}
                                </div>
                            ) : (
                                <div>Nenhum insight adicionado.</div>
                            )
                        }
                    />
                </>
            )}
        </div>
    );
};
