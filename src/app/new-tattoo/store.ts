import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FormState {
    step: number;
    setStep: (step: number) => void;
    data: Record<string, any>;
    setData: (values: Record<string, any>) => void;
}

export const useNewTattooFormStore = create<FormState>()(
    devtools(
        persist(
            (set) => ({
                step: 0,
                setStep: (step) => set({ step }),
                data: {},
                setData: (values) => set((state) => ({
                    data: { ...state.data, ...values }
                })),
            }),
            {
                name: 'new-tattoo-storage',
            },
        ),
    ),
)