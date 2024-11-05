"use client";

import { MdDoneAll, MdNoteAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Tattoo } from "@/lib/db/queries/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { markAsDone } from "@/app/(admin)/tattoo-alerts/actions";
import { toast } from "sonner";
import { Period } from "@/app/(admin)/tattoo-alerts/tattoo-alerts";

interface DoneProps {
    tattoo: Tattoo,
    period?: Period
}

export const Done = ({ tattoo, period }: DoneProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm();

    const onSubmit = async () => {
        await markAsDone(tattoo, period);
        setIsOpen(false);
        toast.success("Atualizado.");
    };

    return (
        <Dialog onOpenChange={ setIsOpen } open={ isOpen }>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <MdDoneAll color="green" className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atenção</DialogTitle>
                    <DialogDescription>Tem certeza que ja enviou a mensagem de remarketing?</DialogDescription>
                </DialogHeader>
                <Form { ...form }>
                    <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-2 items-end">
                        <Button type="submit">Mensagem Enviada!</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};