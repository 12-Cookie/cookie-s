import { create } from "zustand";
import zukeeper from "zukeeper";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  // zukeeper(
  persist(
    (set) => ({
      userData: {
        id: "",
        name: "",
        phone: "",
        companyId: "",
        isAdmin: false,
        gender: "",
        payPerHour: "",
        birthDate: "",
      },
      setUserData: (userData) => set({ userData }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
  // ),
);

// window.store = useUserStore;

export default useUserStore;
