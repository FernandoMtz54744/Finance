import { create } from 'zustand';

type SelectedCategoriaStore = {
  selectedCategoriaId: number | null;
  setSelectedCategoriaId: (id: number | null) => void;
  resetSelectedCategoria: () => void;
};

export const useSelectedCategoriaStore = create<SelectedCategoriaStore>((set) => ({
  selectedCategoriaId: null,
  setSelectedCategoriaId: (id) => set({ selectedCategoriaId: id }),
  resetSelectedCategoria: () => set({ selectedCategoriaId: null }),
}));