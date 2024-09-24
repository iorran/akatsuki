"use client";

import { MdOutlineWhatsapp } from "react-icons/md";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = ({ phone }: { phone: string }) => {
  const openWhatsApp = () => {
    const message = "Hello, I am interested in your services!";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button variant="ghost" onClick={openWhatsApp}>
      <MdOutlineWhatsapp color="green" className="h-8 w-8" />
    </Button>
  );
};