"use client";

import { MdDoneAll } from "react-icons/md";
import { Button } from "@/components/ui/button";

export const Done = ({ phone }: { phone: string }) => {

  return (
    <Button variant="ghost">
      <MdDoneAll color="green" className="h-8 w-8" />
    </Button>
  );
};