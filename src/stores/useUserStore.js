import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    id: null,
    companyId: null,
    gender: null,
    isAdmin: null,
    name: "test",
    payPerHour: null,
    phone: null,
  },
}));
