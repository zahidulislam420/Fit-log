export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }

  return (await res.json()) as Workout[];
}
