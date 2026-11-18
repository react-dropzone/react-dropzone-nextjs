"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Camera, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarDropzoneProps {
  initialImage?: string;
  onImageSelected?: (file: File | null) => void;
  className?: string;
}

export function AvatarDropzone({
  initialImage,
  onImageSelected,
  className,
}: AvatarDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(initialImage ?? null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (preview && !initialImage) {
          URL.revokeObjectURL(preview);
        }
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        onImageSelected?.(file);
      }
    },
    [initialImage, onImageSelected, preview]
  );

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onImageSelected?.(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative w-32 h-32 rounded-full border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden group flex items-center justify-center select-none outline-none",
          isDragActive
            ? "border-blue-500 scale-105 bg-blue-500/10"
            : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 bg-zinc-50 dark:bg-zinc-800/50"
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <Image
              src={preview}
              alt="Avatar preview"
              fill
              unoptimized
              className="object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity bg-black/40 opacity-0 group-hover:opacity-100">
              <Camera className="w-6 h-6 text-white mb-1" />
              <span className="text-[10px] font-medium text-white">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            <User className="w-10 h-10 stroke-[1.5]" />
            <span className="text-[11px] font-medium">Add Photo</span>
          </div>
        )}
      </div>

      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Remove photo
        </button>
      )}
    </div>
  );
}
