import { useForm } from 'react-hook-form';
import { signatureSchema } from '../schema';
import { SignatureComponent } from '../signature';
import { useNewTattooFormStore } from '../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { submitForm } from '../actions';
import { toast } from 'sonner';
import { useState } from 'react';
import { labels } from './questions';
import { TattooDetails } from '@/app/(admin)/tattoo/[id]/tattoo-details';
import { Checkbox } from '@/components/ui/checkbox';

export const SignatureForm = () => {
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);
    const reset = useNewTattooFormStore((state) => state.reset);
    const data = useNewTattooFormStore((state) => state.data);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.output<typeof signatureSchema>>({
        resolver: zodResolver(signatureSchema),
        defaultValues: {
            artistSignature: '',
            clientSignature: '',
            review: false,
            ...(data ?? {}),
        },
    });

    const saveClientSignature = (signature: string) => {
        setData({ clientSignature: signature });
    };

    const saveArtistSignature = (signature: string) => {
        setData({ artistSignature: signature });
    };

    const back = () => {
        setData({ ...data, ...form.getValues() })
        setStep(3);
    };

    const onSubmit = async (formData: z.output<typeof signatureSchema>) => {
        setData({ ...data, ...formData })
        setIsSubmitting(true)
        const { error } = await submitForm({ ...data, ...formData });
        setIsSubmitting(false)
        reset();
        if (error) {
            toast.error(error);
            return;
        }
        toast.success("Novo registro criado.");
    };

    const mapTattooToPreview = (data: Record<string, any>): any => {
        return {
            ...data,
            healthQ1: data.healthQ1 ?? data?.healthRQ1,
            healthQ2: data.healthQ2 ?? data?.healthRQ2,
            healthQ3: data.healthQ3 ?? data?.healthRQ3,
            healthQ4: data.healthQ4 ?? data?.healthRQ4,
            birthday: new Date(data?.birthday).toISOString(),
        }
    }

    return (
        <Form {...form}>
            <TattooDetails tattoo={mapTattooToPreview(data)} preview />
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 items-end mt-8'>
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <div className='w-full space-y-4 pb-8'>
                            <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className='text-lg'>
                                        Revisei os dados, bora tatuar!
                                    </FormLabel>
                                </div>
                            </FormItem>
                            <FormMessage />
                        </div>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientSignature"
                    render={({ field }) => (
                        <div className='flex space-y-4 w-full'>
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>
                                    {labels.clientSignature}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <SignatureComponent
                                        title="Termos e condicões"
                                        description="Assinatura do cliente"
                                        signatureData={data?.clientSignature || null}
                                        saveSignature={signature => {
                                            field.onChange(signature);
                                            saveClientSignature(signature)
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="artistSignature"
                    render={({ field }) => (
                        <div className='flex space-y-4 w-full'>
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>
                                    {labels.artistSignature}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <SignatureComponent
                                        title="Termos e condicões"
                                        description="Assinatura do artista"
                                        signatureData={data?.artistSignature || null}
                                        saveSignature={signature => {
                                            field.onChange(signature);
                                            saveArtistSignature(signature)
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        </div>
                    )}
                />
                <div className="flex gap-4 w-1/2">
                    <Button disabled={isSubmitting} type="button" variant="outline" onClick={back} className="w-1/2">Anterior</Button>
                    <Button disabled={isSubmitting} type="submit" className="w-1/2">Salvar</Button>
                </div>
            </form>
        </Form>
    );
};