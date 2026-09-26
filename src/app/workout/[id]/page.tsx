import { notFound } from "next/navigation";

import { WorkoutDetail } from "@/components/workout-detail";
import { fetchWorkouts } from "@/lib/workouts";

export async function generateStaticParams() {
  const workouts = await fetchWorkouts();
  return workouts.map((workout) => ({ id: String(workout.id) }));
}

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  const workout = (await fetchWorkouts()).find((item) => item.id === numericId);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetail workout={workout} />;
}
