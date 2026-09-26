"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { SiteShell } from "@/components/site-shell";
import { WorkoutCard } from "@/components/workout-card";
import type { Workout } from "@/lib/workouts";
import { fetchWorkouts } from "@/lib/workouts";

type SortKey = "duration" | "calories" | "rating";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    let active = true;

    fetchWorkouts()
      .then((data) => {
        if (!active) return;
        setWorkouts(data);
      })
      .catch(() => {
        if (!active) return;
        setWorkouts([]);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const next = [...workouts];

    switch (sortBy) {
      case "calories":
        return next.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
      case "rating":
        return next.sort((a, b) => b.rating - a.rating);
      case "duration":
      default:
        return next.sort((a, b) => a.duration - b.duration);
    }
  }, [sortBy, workouts]);

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#ccff00]">Workout library</p>
            <h1 className="max-w-xl text-[clamp(2.7rem,7vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white">
              Train with intent. log every set.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/70">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#0a0f14] transition hover:brightness-110"
            >
              <span aria-hidden>→</span>
              Browse workouts
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#101a1d] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
            <div className="relative h-[400px] w-full sm:h-[500px]">
              <Image
                src="/assets/banner.png"
                alt="Fitness trainer posing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section id="library" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00]">The library</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl">
                Twelve lifts covering every major muscle group.
              </h2>
            </div>

            <label className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-[#10181d] px-4 py-2 text-sm text-white/70">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Sort By</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortKey)}
                className="appearance-none bg-transparent pr-7 text-sm font-semibold text-white outline-none"
                aria-label="Sort workouts"
              >
                <option value="duration" className="bg-[#10181d]">Duration</option>
                <option value="calories" className="bg-[#10181d]">Calories</option>
                <option value="rating" className="bg-[#10181d]">Rating</option>
              </select>
              <span aria-hidden className="-ml-6 text-[#ccff00]">▾</span>
            </label>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121b20]">
                  <div className="h-56 animate-pulse bg-white/5" />
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-24 animate-pulse rounded-full bg-white/5" />
                    <div className="h-6 w-40 animate-pulse rounded-full bg-white/5" />
                    <div className="h-4 w-28 animate-pulse rounded-full bg-white/5" />
                    <div className="flex gap-3">
                      <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
                      <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
                      <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {visibleWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
