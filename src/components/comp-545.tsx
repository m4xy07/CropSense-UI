"use client"

import { useEffect } from "react"
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button";

export default function UploadComponent({ onFileUpload, loading }: { onFileUpload: (file: File) => void, loading: boolean }) {
  const maxSizeMB = 2
  const maxSize = maxSizeMB * 1024 * 1024 // 2MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  })
  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null

  // When a file is added, trigger the upload handler
  useEffect(() => {
    if (files[0]?.file && files[0].file instanceof File) {
      onFileUpload(files[0].file);
    }
    // Only run when files changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="flex flex-col gap-2 w-[700px] ">
      <div className="relative">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className=" data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[rgba(255,255,255,.25)] p-4 transition-colors has-[input:focus]:ring-[3px] h-[500px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            disabled={loading}
          />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="mx-auto max-h-full rounded object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="mb-2 flex size-14 shrink-0 items-center justify-center rounded-full image-upload"
                aria-hidden="true"
              >
                <ImageIcon className="size-6 opacity-60" />
              </div>
              <p className="my-1.5 text-base font-medium">Upload an image to detect crop diseases.</p>
              <p className="text-muted-foreground text-sm">
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
              </p>
              
              <Button
                variant="outline"
                className="mt-4 relative py-2 px-3 rent-now-btn rounded-full w-fit text-neutral-50 tracking-tight border border-neutral-400/20 font-normal font-inter text-sm equipment-btn transition-all"
                onClick={openFileDialog}
                disabled={loading}
              >
                <UploadIcon
                  className="-ms-1 size-4 opacity-60"
                  aria-hidden="true"
                />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-12 right-3">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all ease-in-out duration-200 image-upload text-white outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
              disabled={loading}
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      
    </div>
  )
}
