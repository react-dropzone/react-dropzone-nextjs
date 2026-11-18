# AGENTS.md

Guidance for AI coding agents in this repo. Human contributors: see [README.md](./README.md).

This is `react-dropzone-nextjs`: a reference implementation and showcase demonstrating how to
cleanly integrate `react-dropzone` with Next.js App Router (Next.js 15, React 18, TypeScript,
Tailwind CSS), with a primary focus on Server-Side Rendering (SSR) compatibility, hydration safety,
and client-side memory management.

The toolchain is standard Next.js: `next lint` to lint, TypeScript (`tsc --noEmit`) to type-check,
and `next build` to verify production builds and static page generation.

## Workflow

- Clarify the design before implementing. For anything non-trivial, agree on the approach first.
- One unit of change per commit. Never mix unrelated changes. Present the change for review before
  committing.
- Verify against the code and the tools: read before you answer, run before you assert.
- Run local CI before calling work done:

```shell
npm run lint       # ESLint / next lint
npx tsc --noEmit   # TypeScript type check
npm run build      # Production Next.js build
```

## Writing: code, comments, docs, commits

- Concise and to the point. No fluff. Explain the non-obvious; do not narrate the obvious.
- ASCII only. No em-dash and no `--`; write `-`. Use `->` not the arrow glyph, `!=` not the
  not-equal glyph, and so on.
- Comments justify _why_, not _what_. Delete any comment that restates the code.

## Commits

- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`). Write the subject
  in the present tense, imperative voice: `feat: add multi-file dropzone with previews`, not `added`
  or `adds`.
- Keep the body minimal, or omit it. A good subject plus the diff is usually enough; add a body only
  for what the code cannot show (why, a trade-off, a non-obvious consequence). Never restate the
  change or narrate the diff.
- Disclose AI with an `Assisted-by: Antigravity` trailer. Never `Co-Authored-By`, and never add a
  human's `Signed-off-by`.

## Next.js & React Dropzone Conventions

- Client Boundary: Any component using `useDropzone` or browser drag-and-drop events must declare
  `'use client'`. Root pages (`src/app/page.tsx`) should remain Server Components when possible for
  SEO metadata and fast initial HTML delivery.
- Hydration Safety: Never read browser-only globals (`window`, `document`, `navigator`) during
  initial render. Inspect files only within `onDrop` callbacks or inside `useEffect`.
- Memory Management: Every blob preview created via `URL.createObjectURL(file)` must be revoked
  using `URL.revokeObjectURL(url)` on component unmount or when the file is removed from state.
