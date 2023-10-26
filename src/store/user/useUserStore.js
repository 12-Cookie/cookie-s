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
      localStorage.setItem("user", JSON.stringify(userData));
    },
  })),
);

window.store = useUserStore;

export default useUserStore;
