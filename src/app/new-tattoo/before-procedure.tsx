import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../components/ui/form';
import { useNewTattooFormStore } from "./store";
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';
import { beforeProcedureSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Fragment } from 'react';

type BeforeProcedureFormFields = 'beforeProcedureRQ1' | 'beforeProcedureRQ2' | 'beforeProcedureRQ3' | 'beforeProcedureRQ4';
const QUESTIONS: { name: BeforeProcedureFormFields, label: string }[] = [
    {
        name: 'beforeProcedureRQ1',
        label: 'Afirmo ter conferido todos os detalhes da tatuagem (posição, grafia, datas, desenho, etc). Estou ciente de que a tatuagem é um processo artístico.',
    },
    {
        name: 'beforeProcedureRQ2',
        label: 'Não fiz uso de nenhum anestésico e estou ciente que caso seja descoberto o uso durante o procedimento, o mesmo será interrompido sem devolução do valor pago.',
    },
    {
        name: 'beforeProcedureRQ3',
        label: 'Confirmo ter mais de 18 Anos.',
    },
    {
        name: 'beforeProcedureRQ4',
        label: 'Afirmo ter ciência de há câmeras no ambiente laboral e autorizo a gravação de minha imagem.',
    }
];

export const BeforeProcedureForm = () => {
    const data = useNewTattooFormStore((state) => state.data);
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);

    const form = useForm<z.output<typeof beforeProcedureSchema>>({
        resolver: zodResolver(beforeProcedureSchema),
        defaultValues: {
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
                {QUESTIONS.map((question) => (
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
                <div className="flex gap-4 w-1/2">
                    <Button type="button" variant="outline" onClick={back} className="w-1/2">Anterior</Button>
                    <Button type="submit" className="w-1/2">Próximo</Button>
                </div>
            </form>
        </Form>
    );
};