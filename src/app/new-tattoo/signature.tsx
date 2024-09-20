import { useRef } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import SignaturePad from "react-signature-canvas";
import { Button } from '@/components/ui/button';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

interface SignatureProps {
    title: string;
    description: string;
    signatureData: string | null;
    saveSignature: (signature: string) => void;
}

export const SignatureComponent = ({ title, description, signatureData, saveSignature }: SignatureProps) => {
    const sigCanvasRef = useRef<SignaturePad | null>(null);

    const clearSignature = () => {
        sigCanvasRef.current?.clear();
    };

    const saveSignatureHandler = () => {
        if (sigCanvasRef.current) {
            const trimmedSignature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
            saveSignature(trimmedSignature);
        }
    };

    return (
        <AlertDialog>
            {signatureData ? (
                <div className='flex w-full border-dashed border-[1px] border-destructive justify-center'>
                    <img
                        src={signatureData}
                        alt={`${title} signature`}
                        className='block p-10'
                    />
                </div>
            ) : null}
            <AlertDialogTrigger asChild >
                <Button variant="outline">Assinar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <SignaturePad
                    ref={sigCanvasRef}
                    canvasProps={{
                        className: "my-0 mx-auto border-dashed border-[1px] border-destructive w-full"
                    }}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Fechar</AlertDialogCancel>
                    <Button type="button" variant="outline" onClick={clearSignature}>Apagar</Button>
                    <AlertDialogAction onClick={saveSignatureHandler}>Salvar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};