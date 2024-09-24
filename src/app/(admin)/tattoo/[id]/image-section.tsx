import React from 'react';
import { AccordionSection } from './accordion-section';

interface ImageSectionProps<T, K extends ValidFieldKeys<T>> {
    title: string;
    fields: readonly K[];
    data: T;
    labels?: Partial<Record<K, string>>;
}

type ValidFieldKeys<T> = {
    [P in keyof T]: T[P] extends string | number | boolean | Date | null ? P : never;
}[keyof T]

export function ImageSection<T, K extends ValidFieldKeys<T>>({
    title,
    fields,
    data,
    labels = {},
}: ImageSectionProps<T, K>) {
    return (
        <AccordionSection
            title={title}
            value={title}
            content={
                <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-2">
                    {fields.map((field) => (
                        <React.Fragment key={field as string}>
                            <div className="font-bold text-foreground">
                                {labels[field]}
                            </div>
                            <div className="text-foreground">
                                {data[field] ? (
                                    <img
                                        src={data[field] as string}
                                        alt={`signature-${field as any}`}
                                        className="block p-6 max-sm:max-h-24 max-h-44"
                                    />
                                ) : (
                                    'N/A'
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            }
        />
    );
}