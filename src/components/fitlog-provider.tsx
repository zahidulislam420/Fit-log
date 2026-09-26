"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast as toastify } from "react-toastify";
import type { Workout } from "@/lib/workouts";

export type PlanWorkout = Workout & { done?: boolean };

type FitLogContextValue = {
  plan: PlanWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
  markAsDone: (workoutId: number) => void;
  showToast: (message: string) => void;
};

const FitLogContext = createContext<FitLogContextValue | undefined>(undefined);
const STORAGE_KEY = "fitlog-state-v1";

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as { plan?: PlanWorkout[]; saved?: Workout[] };
      if (Array.isArray(parsed.plan)) setPlan(parsed.plan);
      if (Array.isArray(parsed.saved)) setSaved(parsed.saved);
    } catch {
      // Ignore malformed storage state.
    }
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ plan, saved });
    window.localStorage.setItem(STORAGE_KEY, payload);
  }, [plan, saved]);

  const showToast = (message: string) => {
    toastify(message);
  };

  const addToPlan = (workout: Workout) => {
    setPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        showToast("Already in today’s plan");
        return current;
      }

      if (current.length >= 5) {
        showToast("Plan is full for today");
        return current;
      }

      showToast("Added to today’s plan");
      return [...current, { ...workout, done: false }];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        showToast("Already saved for later");
        return current;
      }

      showToast("Saved for later");
      return [...current, workout];
    });
  };

  const removeFromPlan = (workoutId: number) => {
    setPlan((current) => current.filter((item) => item.id !== workoutId));
    showToast("Removed from today’s plan");
  };

  const removeFromSaved = (workoutId: number) => {
    setSaved((current) => current.filter((item) => item.id !== workoutId));
    showToast("Removed from saved list");
  };

  const markAsDone = (workoutId: number) => {
    setPlan((current) =>
      current.map((item) =>
        item.id === workoutId ? { ...item, done: true } : item,
      ),
    );
    toastify.success("Marked as done");
  };

  const value = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    showToast,
  };

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }

  return context;
}
