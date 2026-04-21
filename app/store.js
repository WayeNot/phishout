import { create } from "zustand";

export const useNavData = create((set) => ({
    username: "",
    email: "",
    role: "",
    pp_url: "",
    status: "",
    coin: 0,
    updateUsername(newValue) {
        set({ username: newValue })
    },
    updateEmail(newValue) {
        set({email: newValue})
    },
    updateRole(newValue) {
        set({ role: newValue })
    },
    updatePp_url(newValue) {
        set({pp_url: newValue})
    },
    updateStatus(newValue) {
        set({ status: newValue })
    },
    updateCoin(newValue) {
        set({coin: newValue})
    },
}));