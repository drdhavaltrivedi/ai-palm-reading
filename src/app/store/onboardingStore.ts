import { create } from "zustand";
import type { HandSide } from "../../types";

interface OnboardingState {
  completed: boolean;
  handSide: HandSide | null;
  isDominant: boolean | null;
  setCompleted: (v: boolean) => void;
  setHandChoice: (side: HandSide, dominant: boolean) => void;
  reset: () => void;
}

const initialState = {
  completed: false,
  handSide: null as HandSide | null,
  isDominant: null as boolean | null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setCompleted: (completed) => set({ completed }),
  setHandChoice: (handSide, isDominant) => set({ handSide, isDominant }),
  reset: () => set(initialState),
}));
