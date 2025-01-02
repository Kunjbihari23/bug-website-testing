import { create } from 'zustand';
const initialState = {
  city: { value: '', label: '' },
};

const useCityItemStore = create((set) => ({
  ...initialState,
  change: (newCity) => set((state) => ({ city: { ...state.city, ...newCity } })),
}));

export default useCityItemStore;
