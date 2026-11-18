"use client";

import React, { useState } from "react";
import { ModernDropzone } from "@/components/dropzone";
import { AvatarDropzone } from "@/components/avatar-dropzone";
import { SsrGuide } from "@/components/ssr-guide";
import {
  Files,
  User,
  Upload,
  CheckCircle2,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import type { FileWithPreview } from "@/types/dropzone";

export function Showcase() {
  const [activeTab, setActiveTab] = useState<"multi" | "avatar" | "upload">("multi");

  // Multi-dropzone state options
  const [maxFiles, setMaxFiles] = useState(5);
  const [maxSizeMB, setMaxSizeMB] = useState(5);
  const [allowImagesOnly, setAllowImagesOnly] = useState(false);

  // Upload simulation state
  const [uploadFiles, setUploadFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const simulateUpload = () => {
    if (uploadFiles.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadCompleted(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadCompleted(true);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const resetUpload = () => {
    setUploadFiles([]);
    setUploadProgress(0);
    setUploadCompleted(false);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-center p-1 border rounded-xl bg-zinc-100/70 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("multi")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
            activeTab === "multi"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <Files className="w-4 h-4" />
          Multi-File &amp; Previews
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("avatar")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
            activeTab === "avatar"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <User className="w-4 h-4" />
          Avatar / Single Image
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
            activeTab === "upload"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <Upload className="w-4 h-4" />
          Server Upload Simulation
        </button>
      </div>

      {/* Tab 1: Multi-File & Previews */}
      {activeTab === "multi" && (
        <div className="p-6 border rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Multi-File Dropzone with Previews
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supports drag-over states, image thumbnail generation, file removal, and rejection handling.
              </p>
            </div>

            {/* Interactive configuration toggles */}
            <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <label htmlFor="max-files">Max Files:</label>
                <select
                  id="max-files"
                  value={maxFiles}
                  onChange={(e) => setMaxFiles(Number(e.target.value))}
                  className="px-2 py-1 text-xs border rounded bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label htmlFor="max-size">Max Size:</label>
                <select
                  id="max-size"
                  value={maxSizeMB}
                  onChange={(e) => setMaxSizeMB(Number(e.target.value))}
                  className="px-2 py-1 text-xs border rounded bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                >
                  <option value={1}>1 MB</option>
                  <option value={5}>5 MB</option>
                  <option value={15}>15 MB</option>
                </select>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allowImagesOnly}
                  onChange={(e) => setAllowImagesOnly(e.target.checked)}
                  className="rounded text-blue-600 border-zinc-300 focus:ring-blue-500"
                />
                <span>Images only</span>
              </label>
            </div>
          </div>

          <ModernDropzone
            maxFiles={maxFiles}
            maxSize={maxSizeMB * 1024 * 1024}
            accept={allowImagesOnly ? { "image/*": [".jpeg", ".jpg", ".png", ".webp"] } : undefined}
          />
        </div>
      )}

      {/* Tab 2: Avatar Uploader */}
      {activeTab === "avatar" && (
        <div className="p-8 border rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 flex flex-col items-center text-center">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Avatar &amp; Profile Picture Dropzone
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
              Single-file image dropzone with circular framing, hover overlay, and immediate preview.
            </p>
          </div>

          <AvatarDropzone />
        </div>
      )}

      {/* Tab 3: Upload Simulation */}
      {activeTab === "upload" && (
        <div className="p-6 border rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Next.js Server Upload Simulation
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Demonstrates receiving dropped files, creating FormData, and tracking upload progress to a server endpoint.
            </p>
          </div>

          <ModernDropzone
            maxFiles={3}
            maxSize={5 * 1024 * 1024}
            showPreviews={false}
            onFilesAccepted={(files) => setUploadFiles(files)}
          />

          {uploadFiles.length > 0 && (
            <div className="p-4 border rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Ready to upload {uploadFiles.length} file(s) ({formatBytes(uploadFiles.reduce((acc, f) => acc + f.size, 0))})
                </span>
                <button
                  type="button"
                  onClick={resetUpload}
                  disabled={isUploading}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* Progress Bar */}
              {(isUploading || uploadCompleted) && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>{uploadCompleted ? "Uploaded successfully!" : "Uploading..."}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        uploadCompleted ? "bg-emerald-500" : "bg-blue-600"
                      )}
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={simulateUpload}
                  disabled={isUploading || uploadCompleted}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg text-white transition-all shadow-sm",
                    uploadCompleted
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  )}
                >
                  {uploadCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Uploaded!
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {isUploading ? "Uploading..." : "Simulate Next.js Server Upload"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Architectural SSR Guide Card */}
      <SsrGuide />
    </div>
  );
}
