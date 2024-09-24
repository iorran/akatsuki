import { create } from 'zustand'

interface FormState {
    step: number;
    setStep: (step: number) => void;
    data: Record<string, any>;
    setData: (values: Record<string, any>) => void;
    reset: () => void;
}

export const useNewTattooFormStore = create<FormState>()(
    (set) => ({
        step: 0,
        setStep: (step) => set({ step }),
        data: {},
        setData: (values) => set((state) => ({
            data: { ...state.data, ...values }
        })),
        reset: () => set({ step: 0, data: {} }),
    }),
)