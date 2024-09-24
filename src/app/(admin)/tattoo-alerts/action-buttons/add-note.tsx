import { MdNoteAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { saveRemarketingNotes } from "./actions";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";

export const AddNote = ({ id }: { id: number }) => {
  const { pending } = useFormStatus()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      content: '',
    }
  });

  const onSubmit = async (formData: Record<string, any>) => {
    await saveRemarketingNotes({
      ...formData,
      tattooId: id,
    })
    setIsOpen(false)
    toast.success("Novo registro criado.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <Textarea {...form.register("content", { required: "Campo obrigatório" })} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button disabled={pending} type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};