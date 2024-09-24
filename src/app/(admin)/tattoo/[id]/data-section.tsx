
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
const formatValue = (value: string | number | boolean | null | Date): string | number | boolean => {
    if (value === null) {
        return 'N/A';
    }
    if (typeof value === 'string') {
        const parsedDate = parseISO(value);
        if (isValid(parsedDate)) {
            return format(parsedDate, 'dd/MM/yyyy');
        }
        return value;
    }
    if (value instanceof Date) {
        if (isValid(value)) {
            return format(value, 'dd/MM/yyyy');
        } else {
            return 'Invalid Date';
        }
    }
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
    }
    return 'Unsupported Type';
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
                                        : formatValue(data[field] as string | number | boolean | Date | null)}
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            }
        />
    );
}