import { create } from "zustand";
import zukeeper from "zukeeper";
import { v4 } from "uuid";

const useCompanyStore = create(
  zukeeper((set) => ({
    companyData: {
      id: v4(),
      name: "",
      code: 111111,
      address: "",
      roles: [],
    },
    setCompanyData: (companyData) => {
      set({ companyData });
    },
  })),
);

window.store = useCompanyStore;

export default useCompanyStore;
