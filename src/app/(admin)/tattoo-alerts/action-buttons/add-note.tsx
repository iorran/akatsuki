import { MdNoteAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { saveRemarketingNotes } from "../actions";
import { toast } from "sonner";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const AddNote = ({ tattoo }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      notes: tattoo?.notes || null,
    }
  });

  const onSubmit = async (formData: Record<string, any>) => {
    await saveRemarketingNotes({
      ...formData,
      id: tattoo.id,
    })
    setIsOpen(false);
    toast.success("Novo registro criado.");
  };

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <MdNoteAdd color="darkblue" className="h-8 w-8" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insights</DialogTitle>
            <DialogDescription>Adicione informacões pertinentes ao remarketing</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 items-end'>
              <FormItem className="flex flex-col w-full">
                <FormControl>
                  <Textarea cols={10} rows={20} {...form.register("notes", { required: "Campo obrigatório" })} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button type="submit">Salvar</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};