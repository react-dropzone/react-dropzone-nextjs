"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import Image from "next/image";
import {
  UploadCloud,
  X,
  FileText,
  FileImage,
  FileArchive,
  FileCode,
  File as FileIcon,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import type { DropzoneProps, FileWithPreview } from "@/types/dropzone";

function getFileIcon(file: File) {
  const type = file.type;
  if (type.startsWith("image/")) return <FileImage className="w-5 h-5 text-blue-500" />;
  if (type.includes("pdf") || type.includes("text") || type.includes("document"))
    return <FileText className="w-5 h-5 text-amber-500" />;
  if (type.includes("zip") || type.includes("tar") || type.includes("gzip") || type.includes("rar"))
    return <FileArchive className="w-5 h-5 text-purple-500" />;
  if (type.includes("json") || type.includes("javascript") || type.includes("typescript") || type.includes("html"))
    return <FileCode className="w-5 h-5 text-emerald-500" />;
  return <FileIcon className="w-5 h-5 text-zinc-400" />;
}

export function ModernDropzone({
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  multiple = true,
  disabled = false,
  className,
  onFilesAccepted,
  onFilesRejected,
  dropMessage = "Drag and drop files here, or click to browse",
  acceptMessage = "Drop your files here...",
  rejectMessage = "Some files will be rejected (check size and format)",
  showPreviews = true,
}: DropzoneProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejections, setRejections] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      // Create preview object URLs for accepted files
      const newFiles = accepted.map((file) => {
        const fileWithPreview = Object.assign(file, {
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 9)}`,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        });
        return fileWithPreview as FileWithPreview;
      });

      setFiles((prev) => {
        const combined = multiple ? [...prev, ...newFiles] : newFiles;
        return combined.slice(0, maxFiles);
      });

      setRejections(rejected);

      onFilesAccepted?.(newFiles);
      if (rejected.length > 0) {
        onFilesRejected?.(rejected);
      }
    },
    [maxFiles, multiple, onFilesAccepted, onFilesRejected]
  );

  // Clean up object URLs when component unmounts to prevent memory leaks in Next.js
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const removeFile = (idToRemove: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === idToRemove);
      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((f) => f.id !== idToRemove);
    });
  };

  const removeAll = () => {
    files.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
    setRejections([]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, isFocused } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles,
      multiple,
      disabled,
    });

  // Calculate dynamic border and background styling based on drop state
  const dropzoneStateClasses = isDragReject
    ? "border-red-500 bg-red-500/5 dark:bg-red-950/20"
    : isDragAccept
    ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20"
    : isDragActive
    ? "border-blue-500 bg-blue-500/5 dark:bg-blue-950/20"
    : isFocused
    ? "border-blue-400 ring-2 ring-blue-400/20 bg-zinc-50/50 dark:bg-zinc-900/50"
    : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900/30";

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Drop area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center p-8 text-center transition-all duration-200 border-2 border-dashed rounded-xl cursor-pointer group select-none outline-none",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          dropzoneStateClasses
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-200 group-hover:scale-110",
              isDragReject
                ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                : isDragAccept
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            )}
          >
            {isDragReject ? (
              <AlertCircle className="w-6 h-6 animate-pulse" />
            ) : isDragAccept ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {isDragReject
                ? rejectMessage
                : isDragAccept
                ? acceptMessage
                : isDragActive
                ? "Drop here..."
                : dropMessage}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Supports files up to {formatBytes(maxSize)}
              {maxFiles > 1 ? ` · Max ${maxFiles} files` : " · Single file"}
            </p>
          </div>
        </div>
      </div>

      {/* Validation rejections notice */}
      {rejections.length > 0 && (
        <div className="p-3 space-y-1.5 text-xs border rounded-lg bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400">
          <div className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Some files could not be accepted:</span>
          </div>
          <ul className="pl-5 space-y-0.5 list-disc">
            {rejections.map(({ file, errors }, idx) => (
              <li key={`${file.name}-${idx}`}>
                <span className="font-semibold">{file.name}</span>:{" "}
                {errors.map((e) => e.message).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accepted files preview list */}
      {showPreviews && files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>
              Attached files ({files.length} / {maxFiles})
            </span>
            <button
              type="button"
              onClick={removeAll}
              className="flex items-center gap-1 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative flex items-center gap-3 p-2.5 transition-all duration-150 border rounded-lg group bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
              >
                {/* Thumbnail or File type icon */}
                <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-md shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    getFileIcon(file)
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0 pr-6">
                  <p className="text-xs font-medium truncate text-zinc-800 dark:text-zinc-200" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {formatBytes(file.size)}
                  </p>
                </div>

                {/* Remove file button */}
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                  className="absolute p-1 transition-opacity rounded-full top-2 right-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
