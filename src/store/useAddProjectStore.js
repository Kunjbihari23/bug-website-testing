import { create } from 'zustand';
const initialState = {
  unitDetailArr: [],
  residentialSubCategory: [],
};

const useAddProjectStore = create((set) => ({
  ...initialState,
  setUnitDetailsArr: (unitData) => set({ unitDetailArr: unitData }),
  setResidentialSubCategory: (subcategory) => set({ residentialSubCategory: subcategory }),
}));

export default useAddProjectStore;
