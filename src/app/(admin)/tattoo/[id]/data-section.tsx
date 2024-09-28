
import React from 'react';
import { AccordionSection } from './accordion-section';
import { format, isValid, parseISO } from 'date-fns';

interface DataSectionProps<T, K extends ValidFieldKeys<T>> {
    title: string;
    fields: readonly K[];
    data: T;
    labels?: Partial<Record<K, string>>; // Optional custom labels
    renderValue?: (value: T[K]) => React.ReactNode;
    variant?: 'horizontal' | 'vertical';
}

// Helper type to extract valid field keys
type ValidFieldKeys<T> = {
    [P in keyof T]: T[P] extends string | number | boolean | Date | null ? P : never;
}[keyof T];

// Utility functions
const formatValue = (value: any, field: any) => {
    try {
        if (value === null || value === undefined) {
            return 'N/A'
        }
        
        if (typeof value === 'boolean') {
            return value ? 'Sim' : 'Não';
        }

        if (field === 'birthday') {
            const parsedDate = parseISO(value);
            if (isValid(parsedDate)) {
                return format(parsedDate, 'dd/MM/yyyy');
            }
        }
    } catch (error) {
        console.log(`error:`, error)
        return 'Unsupported Type';
    }
    return value;
};

export function DataSection<T, K extends ValidFieldKeys<T>>({
    title,
    fields,
    data,
    labels = {},
    renderValue,
    variant = 'horizontal',
}: DataSectionProps<T, K>) {
    return (
        <AccordionSection
            title={title}
            value={title}
            content={
                <div className={variant === 'horizontal' ? 'grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-2' : 'flex flex-col gap-2'}>
                    {fields.map((field) => {
                        if (!labels[field]) {
                            return null;
                        }
                        return (
                            <React.Fragment key={field as string}>
                                <div className="font-bold text-foreground">
                                    {labels[field]}
                                </div>
                                <div className="text-foreground">
                                    {renderValue
                                        ? renderValue(data[field])
                                        : formatValue(data[field], field)}
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            }
        />
    );
}