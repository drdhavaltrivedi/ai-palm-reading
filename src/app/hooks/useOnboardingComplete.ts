import { useOnboardingStore } from "../store";

export function useOnboardingComplete(): boolean {
  return useOnboardingStore((s) => s.completed);
}
