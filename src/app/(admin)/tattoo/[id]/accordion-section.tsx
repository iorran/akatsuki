import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AccordionSectionProps {
    title: string;
    content: React.ReactNode;
    value: string;
}

export const AccordionSection = ({ title, content, value }: AccordionSectionProps) => (
    <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value={value} className="w-full">
            <AccordionTrigger>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
            </AccordionTrigger>
            <AccordionContent>
                {content}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);