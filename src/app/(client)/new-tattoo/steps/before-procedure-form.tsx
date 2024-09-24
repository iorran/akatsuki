import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useNewTattooFormStore } from "../store";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { beforeProcedureSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Fragment } from 'react';
import { Input } from '@/components/ui/input';
import { BEFORE_PROCEDURE_QUESTIONS, labels } from './questions';

export const BeforeProcedureForm = () => {
    const data = useNewTattooFormStore((state) => state.data);
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);

    const form = useForm<z.output<typeof beforeProcedureSchema>>({
        resolver: zodResolver(beforeProcedureSchema),
        defaultValues: {
            price: '',
            bodyPart: '',
            ...(data ?? {}),
        },
    });

    const back = () => {
        setData({ ...data, ...form.getValues() });
        setStep(1);
    };

    const onSubmit = (formData: z.output<typeof beforeProcedureSchema>) => {
        setData(formData);
        setStep(3);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-end">
                {BEFORE_PROCEDURE_QUESTIONS.map((question) => (
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
                    </Fragment>
                ))}
                <FormField
                    control={form.control}
                    name="art"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.art}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Informe o que irá tatuar!</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bodyPart"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.bodyPart}</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.price}</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 w-1/2">
                    <Button type="button" variant="outline" onClick={back} className="w-1/2">Anterior</Button>
                    <Button type="submit" className="w-1/2">Próximo</Button>
                </div>
            </form>
        </Form>
    );
};