import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FormState {
    open: boolean;
    openDialog: () => void;
    step: number;
    setStep: (step: number) => void;
    data: Record<string, any>;
    setData: (values: Record<string, any>) => void;
    reset: () => void;
}

export const useNewTattooFormStore = create<FormState>()(
    devtools(
        persist(
            (set) => ({
                open: false,
                openDialog: () => set({ open: true }),
                step: 0,
                setStep: (step) => set({ step }),
                data: {},
                setData: (values) => set((state) => ({
                    data: { ...state.data, ...values }
                })),
                reset: () => set({ step: 0, data: {}, open: false }),
            }),
            {
                name: 'new-tattoo-storage',
            },
        ),
    ),
)