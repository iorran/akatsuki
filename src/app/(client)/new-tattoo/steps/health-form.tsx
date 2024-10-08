import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useNewTattooFormStore } from "../store";
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { healthSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Fragment } from 'react';
import { HEALTH_QUESTIONS } from './questions';

export const HealthForm = () => {
    const data = useNewTattooFormStore((state) => state.data);
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);

    const form = useForm<z.output<typeof healthSchema>>({
        resolver: zodResolver(healthSchema),
        defaultValues: {
            healthRQ1: undefined,
            healthQ1: undefined,
            healthRQ2: undefined,
            healthQ2: undefined,
            healthRQ3: undefined,
            healthQ3: undefined,
            healthRQ4: undefined,
            healthQ4: undefined,
            ...(data ?? {}),
        },
    });

    const watchedFields = useWatch({
        control: form.control,
        name: HEALTH_QUESTIONS.map((question) => question.name),
    });

    const back = () => {
        setData({ ...data, ...form.getValues() });
        setStep(0);
    };

    const onSubmit = (formData: z.output<typeof healthSchema>) => {
        setData(formData);
        setStep(2);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-end">
                {HEALTH_QUESTIONS.map((question, index) => (
                    <Fragment key={question.name}>
                        <FormField
                            control={form.control}
                            name={question.name}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{question.label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {['Sim', 'Nao'].map((option) => (
                                                <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={option} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{option}</FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            watchedFields[index] === "Sim" ?
                                <FormField
                                    control={form.control}
                                    name={question.textAreaName}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Descreva</FormLabel>
                                            <FormControl>
                                                <Textarea className="resize-none" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> : null
                        }
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