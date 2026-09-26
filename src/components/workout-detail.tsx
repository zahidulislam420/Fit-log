"use client";

import Image from "next/image";
import Link from "next/link";

import { useFitLog } from "@/components/fitlog-provider";
import { SiteShell } from "@/components/site-shell";
import type { Workout } from "@/lib/workouts";

export function WorkoutDetail({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved } = useFitLog();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", `${workout.sets}`],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", `${workout.rating.toFixed(1)}`],
  ];

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f171b]">
            <div className="relative h-[420px] w-full sm:h-[520px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00]">Workout</p>
              <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] text-white md:text-5xl">
                {workout.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-white/70">{workout.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-[#ccff00]/50 bg-[#ccff00]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8f75b]"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121b20]">
              <div className="border-b border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                Key Specs
              </div>
              <dl>
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[140px_1fr] gap-4 border-b border-white/5 px-5 py-3 last:border-b-0"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{label}</dt>
                    <dd className="text-sm font-medium text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-black uppercase tracking-[0.2em] text-white">Instructions</h2>
              <ol className="space-y-3">
                {workout.instructions.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-[#10181d] p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-[#0a0f14]">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-6 text-white/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#091015] transition hover:brightness-110"
              >
                <span aria-hidden>＋</span>
                Add to today&apos;s plan
              </button>
              <button
                type="button"
                onClick={() => addToSaved(workout)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <span aria-hidden>☆</span>
                Save for later
              </button>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
