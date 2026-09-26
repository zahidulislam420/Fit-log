"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
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
type FitLogState = Pick<FitLogContextValue, "plan" | "saved"> & { hydrated: boolean };

const emptyState: FitLogState = { plan: [], saved: [], hydrated: false };
let state = emptyState;
const listeners = new Set<() => void>();

function getSnapshot() {
  return state;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!state.hydrated && typeof window !== "undefined") {
    let plan: PlanWorkout[] = [];
    let saved: Workout[] = [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { plan?: PlanWorkout[]; saved?: Workout[] };
        if (Array.isArray(parsed.plan)) plan = parsed.plan;
        if (Array.isArray(parsed.saved)) saved = parsed.saved;
      }
    } catch {
      // Ignore malformed storage state, as in the previous provider.
    }

    state = { plan, saved, hydrated: true };
    listeners.forEach((notify) => notify());
  }

  return () => {
    listeners.delete(listener);
  };
}

export function FitLogProvider({ children }: { children: ReactNode }) {
  const currentState = useSyncExternalStore(subscribe, getSnapshot, () => emptyState);

  useEffect(() => {
    if (!currentState.hydrated) return;
    const payload = JSON.stringify({ plan: currentState.plan, saved: currentState.saved });
    window.localStorage.setItem(STORAGE_KEY, payload);
  }, [currentState]);

  const updateState = (updater: (current: FitLogState) => FitLogState) => {
    state = updater(state);
    listeners.forEach((notify) => notify());
  };

  const showToast = (message: string) => {
    toastify(message);
  };

  const addToPlan = (workout: Workout) => {
    updateState((current) => {
      if (current.plan.some((item) => item.id === workout.id)) {
        showToast("Already in today’s plan");
        return current;
      }

      if (current.plan.length >= 5) {
        showToast("Plan is full for today");
        return current;
      }

      showToast("Added to today’s plan");
      return {
        ...current,
        plan: [...current.plan, { ...workout, done: false }],
      };
    });
  };

  const addToSaved = (workout: Workout) => {
    updateState((current) => {
      if (current.saved.some((item) => item.id === workout.id)) {
        showToast("Already saved for later");
        return current;
      }

      showToast("Saved for later");
      return { ...current, saved: [...current.saved, workout] };
    });
  };

  const removeFromPlan = (workoutId: number) => {
    updateState((current) => ({
      ...current,
      plan: current.plan.filter((item) => item.id !== workoutId),
    }));
    showToast("Removed from today’s plan");
  };

  const removeFromSaved = (workoutId: number) => {
    updateState((current) => ({
      ...current,
      saved: current.saved.filter((item) => item.id !== workoutId),
    }));
    showToast("Removed from saved list");
  };

  const markAsDone = (workoutId: number) => {
    updateState((current) => ({
      ...current,
      plan: current.plan.map((item) =>
        item.id === workoutId ? { ...item, done: true } : item,
      ),
    }));
    toastify.success("Marked as done");
  };

  const value = {
    plan: currentState.plan,
    saved: currentState.saved,
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
