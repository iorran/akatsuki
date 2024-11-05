"use client";

import { MdDoneAll } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Tattoo } from "@/lib/db/queries/select";

export const Done = ({ tattoo }: { tattoo: Tattoo }) => {
  return (
    <Button variant="ghost">
      <MdDoneAll color="green" className="h-8 w-8" />
    </Button>
  );
};