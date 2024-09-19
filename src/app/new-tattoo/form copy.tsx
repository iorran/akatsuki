'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitForm } from './actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalInformationSchema } from './schema';
import { toast } from "sonner"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export function PersonalInformation() {
    const form = useForm<z.output<typeof personalInformationSchema>>({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            name: '',
            email: '',
        }
    });

    const onSubmit = async (formData: z.output<typeof personalInformationSchema>) => {
        const { error } = await submitForm(formData);
        if (error) {
            toast.error(error);
            return;
        }
        toast.success("Novo registro criado.");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-end">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-1/4">Submit</Button>
            </form>
        </Form>
    );
}