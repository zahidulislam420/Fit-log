"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useFitLog } from "@/components/fitlog-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const navItems = [
    { href: "/", label: "Workout" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f14] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-black tracking-[0.2em] text-white">FITLOG</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-[0.18em] transition ${
                    isActive ? "text-[#ccff00]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#0a0f14] shadow-[0_0_20px_rgba(204,255,0,0.35)]"
            >
              Plan
              <span className="rounded-full bg-[#0a0f14] px-1.5 py-0.5 text-[10px] text-[#ccff00]">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white"
            >
              Saved
              <span className="rounded-full border border-white/20 px-1.5 py-0.5 text-[10px] text-white">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="mt-16 border-t border-white/10 bg-[#080d11]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt=""
              width={24}
              height={24}
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-black tracking-[0.2em] text-white">FITLOG</span>
          </div>
          <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>
      </footer>
    </div>
  );
}
