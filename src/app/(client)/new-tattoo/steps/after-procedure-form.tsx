import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useNewTattooFormStore } from "../store";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { afterProcedureSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Fragment } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { AFTER_PROCEDURE_QUESTIONS } from './questions';

export const AfterProcedureForm = () => {
    const data = useNewTattooFormStore((state) => state.data);
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);

    const form = useForm<z.output<typeof afterProcedureSchema>>({
        resolver: zodResolver(afterProcedureSchema),
        defaultValues: {
            // its false because there is a refine on the schema, normally its undefined as default
            afterProcedureRQ1: false,
            afterProcedureRQ2: false,
            afterProcedureRQ3: false,
            ...(data ?? {}),
        },
    });

    const back = () => {
        setData({ ...data, ...form.getValues() })
        setStep(2);
    };

    // const onSubmit = async (formData: z.output<typeof afterProcedureSchema>) => {
    //     setData({ ...data, ...formData })
    //     const { error } = await submitForm({ ...data, ...formData });
    //     if (error) {
    //         toast.error(error);
    //         return;
    //     }
    //     reset();
    //     toast.success("Novo registro criado.");
    // };

    const onSubmit = (formData: z.output<typeof afterProcedureSchema>) => {
        setData(formData);
        setStep(4);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-end">
                {AFTER_PROCEDURE_QUESTIONS.map((question) => (
                    <Fragment key={question.name}>
                        <FormField
                            control={form.control}
                            name={question.name}
                            render={({ field }) => (
                                <div className='w-full space-y-4'>
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                {question.label}
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                    <FormMessage />
                                </div>
                            )}
                        />
                    </Fragment>
                ))}
                <div className="flex gap-4 w-1/2">
                    <Button type="button" variant="outline" onClick={back} className="w-1/2">Anterior</Button>
                    <Button type="submit" className="w-1/2">Próximo</Button>
                </div>
            </form>
        </Form>
    );
};