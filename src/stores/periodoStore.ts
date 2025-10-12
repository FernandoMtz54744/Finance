import type { Periodo } from '@/types/periodo';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type PeriodoStore = {
    periodo: Periodo | null,
    setPeriodo: (periodo: Periodo | null) => void;
    clearPeriodo: () => void;
}

export const usePeriodoStore = create<PeriodoStore>()(
    persist<PeriodoStore>(
        (set) => ({
            periodo: null,
            setPeriodo: (periodo: Periodo | null) => set({periodo}),
            clearPeriodo: () => set({ periodo: null }),
        }),
        { name: "periodo-storage" }
    )
);