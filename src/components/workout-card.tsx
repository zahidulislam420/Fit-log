import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/lib/workouts";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121b20] text-left transition duration-200 hover:-translate-y-1 hover:border-[#ccff00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.07)]"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-white/15 bg-white/4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d8e5b5]"
            >
              {group}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-black uppercase tracking-[0.08em] text-white">
            {workout.name}
          </h3>
          <p className="mt-2 text-sm text-white/60">{workout.equipment}</p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <span aria-hidden>⏱</span>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden>🔥</span>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden>★</span>
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
