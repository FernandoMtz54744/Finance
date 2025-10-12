import type { Tarjeta } from '@/types/tarjeta';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type TarjetaStore = {
    tarjeta: Tarjeta | null,
    setTarjeta: (tarjeta: Tarjeta | null) => void;
    clearTarjeta: () => void;
}

export const useTarjetaStore = create<TarjetaStore>()(
    persist<TarjetaStore>(
        (set) => ({
            tarjeta: null,
            setTarjeta: (tarjeta: Tarjeta | null) => set({tarjeta}),
            clearTarjeta: () => set({ tarjeta: null }),
        }),
        { name: "tarjeta-storage" }
    )
);