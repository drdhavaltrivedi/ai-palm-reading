/**
 * Navigation param lists for type-safe routing.
 */

import type { Reading } from "./reading";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Capture: undefined;
  AnalysisLoading: { readingId?: string; jobId?: string };
  Reading: { reading: Reading; imageUri: string };
  Chat: { reading: Reading; imageUri: string };
};

export type HistoryStackParamList = {
  History: undefined;
  ReadingDetail: { reading: Reading };
  Compare: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Paywall: undefined;
};
