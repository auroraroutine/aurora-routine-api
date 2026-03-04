import { create } from "zustand";

interface BabyState {
  journeyStage: "trying" | "pregnancy" | "newborn" | "older" | null;
  pregnancyWeek: number;
  name: string;
  birthDate: string;
  weight: string;
  height: string;
  isPremium: boolean;
  isPro: boolean;
  setJourneyStage: (stage: "trying" | "pregnancy" | "newborn" | "older") => void;
  setBabyInfo: (info: Partial<BabyState>) => void;
  upgradePlan: (plan: "premium" | "pro" | "free") => void;
}

export const useBabyStore = create<BabyState>((set) => ({
  journeyStage: null,
  pregnancyWeek: 24, // default for demo
  name: "",
  birthDate: "",
  weight: "",
  height: "",
  isPremium: false,
  isPro: false,
  setJourneyStage: (stage) => set({ journeyStage: stage }),
  setBabyInfo: (info) => set((state) => ({ ...state, ...info })),
  upgradePlan: (plan) => set({ 
    isPremium: plan === "premium" || plan === "pro",
    isPro: plan === "pro"
  })
}));
