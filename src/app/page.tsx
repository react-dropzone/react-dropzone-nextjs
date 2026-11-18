import { Showcase } from "@/components/showcase";
import { UploadCloud, Layers, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 md:p-16">
      {/* Header & Hero */}
      <header className="max-w-4xl mx-auto w-full text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next.js 15 App Router &amp; React Dropzone</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Drag &amp; Drop in Next.js
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Production-grade file uploads demonstrating Server Component architecture,
          SSR compatibility, hydration safety, and rich client previews.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            App Router
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Hydration Safe
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <UploadCloud className="w-3.5 h-3.5 text-blue-500" />
            react-dropzone 14
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            TypeScript 5
          </span>
        </div>
      </header>

      {/* Main Interactive Showcase */}
      <main className="flex justify-center w-full">
        <Showcase />
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-16 text-xs text-zinc-500 dark:text-zinc-500 space-y-2">
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            Next.js
          </a>
          ,{" "}
          <a
            href="https://react-dropzone.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            react-dropzone
          </a>
          , and{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            Tailwind CSS
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
