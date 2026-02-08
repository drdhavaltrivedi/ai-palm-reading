import { create } from "zustand";
import type { Reading } from "../../types";

interface ReadingsState {
  readings: Reading[];
  addReading: (r: Reading) => void;
  setReadings: (r: Reading[]) => void;
  getReadingById: (id: string) => Reading | undefined;
}

export const useReadingsStore = create<ReadingsState>((set, get) => ({
  readings: [],
  addReading: (reading) =>
    set((s) => ({ readings: [reading, ...s.readings] })),
  setReadings: (readings) => set({ readings }),
  getReadingById: (id) => get().readings.find((r) => r.id === id),
}));
