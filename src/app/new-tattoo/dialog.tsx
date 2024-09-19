"use client"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useNewTattooFormStore } from "./store";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "./multi-step-form";

export const NewTattooDialog = () => {
    const open = useNewTattooFormStore(state => state.open);
    const openDialog = useNewTattooFormStore(state => state.openDialog);

    return (
        <Dialog open={open}>
            <div className="flex w-full justify-end">
                <DialogTrigger asChild>
                    <Button>New Tattoo</Button>
                </DialogTrigger>
            </div>
            <DialogContent>
                <MultiStepForm />
            </DialogContent>
        </Dialog>
    )
}