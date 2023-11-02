import { create } from "zustand";

const useCompanyStore = create((set) => ({
  companyData: {
    id: "",
    name: "",
    code: null,
    address: "",
    roles: [],
  },
  setCompanyData: (companyData) => {
    set({ companyData });
  },
}));

export default useCompanyStore;
