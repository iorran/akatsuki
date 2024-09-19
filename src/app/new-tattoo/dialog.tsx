"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useNewTattooFormStore } from "./store";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "./multi-step-form";
import { DialogTitle } from "@radix-ui/react-dialog";

export const NewTattooDialog = () => {
    const open = useNewTattooFormStore(state => state.open);
    const setOpen = useNewTattooFormStore(state => state.setOpen);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex w-full justify-end">
                <DialogTrigger asChild>
                    <Button>New Tattoo</Button>
                </DialogTrigger>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Termos e condições
                    </DialogTitle>
                </DialogHeader>
                <MultiStepForm />
            </DialogContent>
        </Dialog>
    )
}