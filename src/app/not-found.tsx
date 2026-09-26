import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFoundPage() {
  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#ccff00]">404</p>
        <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.06em] text-white">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-white/70">
          The workout you were looking for does not exist or has moved. Head back to the library and keep training.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#0a0f14]"
        >
          Go to workouts
        </Link>
      </main>
    </SiteShell>
  );
}
