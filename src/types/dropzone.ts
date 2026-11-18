import type { DropzoneOptions, FileRejection } from "react-dropzone";

export interface FileWithPreview extends File {
  id: string;
  preview?: string;
}

export interface DropzoneProps extends Omit<DropzoneOptions, "onDrop"> {
  onFilesAccepted?: (files: FileWithPreview[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;
  className?: string;
  dropMessage?: string;
  acceptMessage?: string;
  rejectMessage?: string;
  showPreviews?: boolean;
}
