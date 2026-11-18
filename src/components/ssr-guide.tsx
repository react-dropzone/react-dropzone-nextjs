"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Code2, Server, ShieldCheck, Zap } from "lucide-react";

export function SsrGuide() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full border rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Next.js SSR &amp; React Dropzone: Architectural Best Practices
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              How to avoid hydration mismatches, client memory leaks, and handle server uploads
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                1. Client Boundary
              </div>
              <p className="leading-relaxed text-zinc-500 dark:text-zinc-400">
                Mark dropzone components with <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px]">&apos;use client&apos;</code>.
                Keep root and route pages (<code className="font-mono text-[11px]">page.tsx</code>) as Server Components for fast initial payloads and metadata SEO.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                2. Hydration Safety
              </div>
              <p className="leading-relaxed text-zinc-500 dark:text-zinc-400">
                React Dropzone generates internal input attributes. Never use browser-only globals (<code className="font-mono text-[11px]">window</code>, <code className="font-mono text-[11px]">navigator</code>) during initial render. Only read dropped files inside <code className="font-mono text-[11px]">onDrop</code>.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                3. Memory Leak Prevention
              </div>
              <p className="leading-relaxed text-zinc-500 dark:text-zinc-400">
                When generating image thumbnails with <code className="font-mono text-[11px]">URL.createObjectURL()</code>, always call <code className="font-mono text-[11px]">URL.revokeObjectURL()</code> in an effect cleanup return or when items are deleted.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-200 font-mono text-[11px] overflow-x-auto">
            <span className="text-zinc-400">{"// Next.js Server Action / API Route Upload pattern:"}</span>
            {"\n"}
            <span className="text-purple-400">async function</span> uploadFile(file: File) &#123;
            {"\n"}  <span className="text-purple-400">const</span> formData = <span className="text-purple-400">new</span> FormData();
            {"\n"}  formData.append(<span className="text-emerald-300">&apos;file&apos;</span>, file);
            {"\n"}  <span className="text-purple-400">await</span> fetch(<span className="text-emerald-300">&apos;/api/upload&apos;</span>, &#123; method: <span className="text-emerald-300">&apos;POST&apos;</span>, body: formData &#125;);
            {"\n"}&#125;
          </div>
        </div>
      )}
    </div>
  );
}
