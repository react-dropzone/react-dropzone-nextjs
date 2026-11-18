# React Dropzone + Next.js App Router Showcase

A modern, production-ready reference implementation demonstrating how to cleanly integrate [react-dropzone](https://react-dropzone.js.org/) with [Next.js 15](https://nextjs.org/) App Router, TypeScript, and Tailwind CSS.

## Why this project? (Next.js SSR & react-dropzone)

Using `react-dropzone` in modern Next.js requires understanding how client-side file APIs interact with Server-Side Rendering (SSR) and the App Router:

1. **Client Boundary (`'use client'`)**:
   `react-dropzone` relies on DOM event listeners, `useRef`, `window`, and `document` drag-and-drop APIs. Wrapping dropzone logic inside a `'use client'` component creates a clean boundary while allowing root routes (`page.tsx`) to remain fast, SEO-friendly Server Components.

2. **Hydration Safety**:
   Dropzone input IDs and browser-only properties should not cause server/client HTML divergence. Files are only accessed client-side inside `onDrop` callbacks, completely preventing React hydration mismatches.

3. **Memory Leak Prevention**:
   When rendering client-side image thumbnails via `URL.createObjectURL(file)`, the generated blob URLs must be explicitly revoked via `URL.revokeObjectURL(url)` during component unmount or when files are removed.

4. **Handling Uploads with Server Actions / API Routes**:
   Dropped `File` objects can be packaged into standard `FormData` and streamed to Next.js Route Handlers (`app/api/upload/route.ts`) or Server Actions.

## Features

- **TypeScript 5**: Fully type-safe props, event handlers, and extended file preview interfaces.
- **Dynamic Drag States**: Clear visual feedback for active dragging, accepted file types (`isDragAccept`), and rejected formats (`isDragReject`).
- **Rich File Previews**: Image thumbnail rendering with automatic cleanup, plus distinct file icons for PDFs, code, audio/video, and archives.
- **Validation & Error Handling**: User-friendly alerts displaying rejection reasons (max size exceeded, format disallowed, too many files).
- **Multiple Dropzone Variants**:
  - **Multi-File Dropzone**: Configurable file count, size limits, and removable file grid.
  - **Avatar / Single Image Uploader**: Circular profile photo uploader with hover-to-replace overlay.
  - **Server Upload Simulation**: Interactive upload progress bar and file metadata summary.
- **Tailwind CSS & Dark Mode**: Responsive design with seamless dark/light theme support.

## Project Structure

```text
react-dropzone-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Geist font & SEO metadata
│   │   ├── page.tsx           # Server Component entry point
│   │   └── globals.css        # Tailwind styling & dark mode tokens
│   ├── components/
│   │   ├── dropzone.tsx       # Reusable, feature-complete Multi-File Dropzone
│   │   ├── avatar-dropzone.tsx# Single image/avatar dropzone
│   │   ├── showcase.tsx       # Tabbed demo manager with live settings
│   │   └── ssr-guide.tsx      # In-app architectural guide for SSR & Dropzone
│   ├── lib/
│   │   └── utils.ts           # Class merging (cn) & human-readable formatBytes
│   └── types/
│       └── dropzone.ts        # TypeScript definitions
├── tsconfig.json
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the interactive showcase.

### 3. Build & Type Check

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

## Usage Example

### Basic Dropzone

```tsx
"use client";

import { ModernDropzone } from "@/components/dropzone";

export function UploadSection() {
  return (
    <ModernDropzone
      maxFiles={5}
      maxSize={10 * 1024 * 1024} // 10 MB
      accept={{ "image/*": [".png", ".jpg", ".webp"] }}
      onFilesAccepted={(files) => console.log("Accepted files:", files)}
      onFilesRejected={(rejections) => console.warn("Rejected files:", rejections)}
    />
  );
}
```

### Submitting to a Next.js Server Route

```tsx
"use client";

async function uploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
}
```

## License

MIT
