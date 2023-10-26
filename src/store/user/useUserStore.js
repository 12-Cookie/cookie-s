import { create } from "zustand";
import zukeeper from "zukeeper";

const useUserStore = create(
  zukeeper((set) => ({
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
    setUserData: (userData) => {
      set({ userData });
    },
  })),
);

window.store = useUserStore;

export default useUserStore;
