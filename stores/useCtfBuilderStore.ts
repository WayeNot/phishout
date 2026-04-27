import { create } from "zustand";
import { category, difficulty, NewCtfFlag } from "@/lib/types";

type CtfBuilderState = {
    title: string;
    description: string;
    difficulty: difficulty | "";
    category: category[];
    flag_format: string;
    points: number;
    coins: number;
};

type Store = {
    isOpen: boolean;
    setOpen: (v: boolean) => void;

    builder: CtfBuilderState;
    setBuilder: (v: Partial<CtfBuilderState>) => void;
    resetBuilder: () => void;

    flags: NewCtfFlag[];
    setFlags: (v: NewCtfFlag[] | ((prev: NewCtfFlag[]) => NewCtfFlag[])) => void;

    selectedFiles: File[];
    setSelectedFiles: (v: File[] | ((prev: File[]) => File[])) => void;
};

export const useCtfBuilderStore = create<Store>((set) => ({
    isOpen: false,
    setOpen: (v) => set({ isOpen: v }),

    builder: {
        title: "",
        description: "",
        difficulty: "",
        category: [],
        flag_format: "",
        coins: 0,
        points: 0,
    },

    setBuilder: (v) =>
        set((state) => ({
            builder: { ...state.builder, ...v },
        })),

    resetBuilder: () =>
        set({
            builder: {
                title: "",
                description: "",
                difficulty: "",
                category: [],
                flag_format: "",
                coins: 0,
                points: 0,
            },
            flags: [],
            selectedFiles: [],
        }),

    flags: [],
    setFlags: (v) =>
        set((state) => ({
            flags: typeof v === "function" ? v(state.flags) : v,
        })),

    selectedFiles: [],
    setSelectedFiles: (v) =>
        set((state) => ({
            selectedFiles: typeof v === "function" ? v(state.selectedFiles) : v,
        })),
}));