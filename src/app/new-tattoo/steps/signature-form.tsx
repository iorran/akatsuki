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
import { useFormStatus } from 'react-dom';

export const SignatureForm = () => {
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);
    const reset = useNewTattooFormStore((state) => state.reset);
    const data = useNewTattooFormStore((state) => state.data);
    const { pending } = useFormStatus()  

    const form = useForm<z.output<typeof signatureSchema>>({
        resolver: zodResolver(signatureSchema),
        defaultValues: {
            artistSignature: '',
            clientSignature: '',
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
        const { error } = await submitForm({ ...data, ...formData });
        if (error) {
            toast.error(error);
            return;
        }
        reset();
        toast.success("Novo registro criado.");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 items-end'>
                <FormField
                    control={form.control}
                    name="clientSignature"
                    render={({ field }) => (
                        <div className='flex space-y-4 w-full'>
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>
                                    Assinatura do cliente
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
                                    Assinatura do artista
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
                    <Button disabled={pending} type="button" variant="outline" onClick={back} className="w-1/2">Anterior</Button>
                    <Button disabled={pending} type="submit" className="w-1/2">Salvar</Button>
                </div>
            </form>
        </Form>
    );
};