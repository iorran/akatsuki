"use client";

import { MdNoteAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";

export const AddNote = ({ phone }: { phone: string }) => {

  return (
    <Button variant="ghost">
      <MdNoteAdd color="darkblue" className="h-8 w-8" />
    </Button>
  );
};