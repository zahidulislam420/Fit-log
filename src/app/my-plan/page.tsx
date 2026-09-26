"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { SiteShell } from "@/components/site-shell";
import { useFitLog } from "@/components/fitlog-provider";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleItems = activeTab === "plan" ? plan : saved;
  const totalMinutes = useMemo(() => plan.reduce((sum, item) => sum + item.duration, 0), [plan]);
  const totalCalories = useMemo(() => plan.reduce((sum, item) => sum + item.caloriesBurned, 0), [plan]);
  const isPlanTab = activeTab === "plan";

  if (loading) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-2xl font-semibold text-white/80">Loading workouts…</p>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00]">Your plan</p>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] text-white md:text-5xl">
              My Plan
            </h1>
            <p className="mt-3 text-white/60">Cap of five lifts for today. Finish them, then load more.</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "Exercises", value: `${plan.length}` },
            { label: "Minutes", value: `${totalMinutes}` },
            { label: "Calories", value: `${totalCalories}` },
          ].map((metric) => (
            <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-[#10181d] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{metric.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex gap-3">
          {[
            { key: "plan", label: "Today&apos;s Plan" },
            { key: "saved", label: "Saved" },
          ].map((tab) => {
            const selected = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as "plan" | "saved")}
                className={`rounded-full px-4 py-2 text-sm font-black uppercase tracking-[0.16em] ${
                  selected
                    ? "bg-[#ccff00] text-[#0b1116]"
                    : "border border-white/15 bg-transparent text-white/70"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {visibleItems.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-[#10181d] px-6 py-10 text-center">
            <p className="text-3xl font-black uppercase tracking-[0.18em] text-white">Nothing here yet</p>
            <p className="mt-4 max-w-md text-white/60">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#0a0f14]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleItems.map((item) => {
              const isCompleted = isPlanTab && "done" in item && item.done === true;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[#10181d] p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-[1.25rem] sm:w-40">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="160px" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-black uppercase tracking-[-0.04em] text-white">{item.name}</h2>
                        <p className="mt-1 text-sm text-white/60">{item.equipment}</p>
                      </div>
                      {isCompleted ? (
                        <span className="inline-flex w-fit rounded-full bg-[#ccff00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9f75c]">
                          Done
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/70">
                      <span className="flex items-center gap-2">⏱ {item.duration} min</span>
                      <span className="flex items-center gap-2">🔥 {item.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-2">★ {item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:justify-end">
                    <Link
                      href={`/workout/${item.id}`}
                      className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white"
                    >
                      View Details
                    </Link>
                    {isPlanTab ? (
                      <button
                        type="button"
                        onClick={() => markAsDone(item.id)}
                        disabled={isCompleted}
                        className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
                          isCompleted
                            ? "cursor-default border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#d9f75c]"
                            : "bg-[#ccff00] text-[#0a0f14] hover:brightness-110"
                        }`}
                      >
                        <span aria-hidden="true">✓</span>
                        {isCompleted ? "Done" : "Mark as Done"}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => (isPlanTab ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                      className="rounded-full border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-red-200"
                      aria-label={`Remove ${item.name}`}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </SiteShell>
  );
}
