'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalInformationSchema } from '../schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useNewTattooFormStore } from '../store';
import { cn } from '@/lib/utils';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { labels } from './questions';
import { Checkbox } from '@/components/ui/checkbox';

export function PersonalInformationForm() {
    const data = useNewTattooFormStore((state) => state.data);
    const setData = useNewTattooFormStore((state) => state.setData);
    const setStep = useNewTattooFormStore((state) => state.setStep);
    const form = useForm<z.output<typeof personalInformationSchema>>({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '+351',
            birthday: undefined,
            document: '',
            whereFoundUs: '',
            promotions: true,
            ...(data ?? {}),
            ...(data.birthday ? { birthday: new Date(data.birthday) }: {})
        }
    });

    const onSubmit = (formData: z.output<typeof personalInformationSchema>) => {
        setData(formData);
        setStep(1);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-end">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.name}</FormLabel>
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
                            <FormLabel>{labels.email}</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.phone}</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.document}</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel>{labels.birthday}</FormLabel>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? format(field.value, "PPP") : "Selecione a data"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        captionLayout='dropdown'
                                        fromYear={1920}
                                        toYear={2025}
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whereFoundUs"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>{labels.whereFoundUs}</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="promotions"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 w-full">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    {labels.promotions}
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormMessage />
                <Button type="submit" className="w-1/4">Próximo</Button>
            </form>
        </Form>
    );
}