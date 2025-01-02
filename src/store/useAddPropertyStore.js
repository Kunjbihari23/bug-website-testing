import { create } from 'zustand';
const initialState = {
  activeStep: 0,
  totalStep: 5,
};

const useAddPropertyStore = create((set) => ({
  ...initialState,
  nextStep: () =>
    set((state) => ({ activeStep: state.activeStep < state.totalStep ? state.activeStep + 1 : state.activeStep })),
  prevStep: () => set((state) => ({ activeStep: state.activeStep > 0 ? state.activeStep - 1 : state.activeStep })),
  resetStep: () => set(initialState),
}));

export default useAddPropertyStore;
