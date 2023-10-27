import { create } from "zustand";
import zukeeper from "zukeeper";
import { v4 } from "uuid";
import { persist, createJSONStorage } from "zustand/middleware";

const useCompanyStore = create(
  // zukeeper(
  persist(
    (set) => ({
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
    }),
    {
      name: "company",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
  // ),
);

// window.store = useCompanyStore;

export default useCompanyStore;
