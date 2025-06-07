"use client";

import { useState, useRef } from "react";
import { upload, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError } from "@imagekit/next";

type UploadProps = {
  setVideoUrl?: (url: string) => void;
  setThumbnailUrl?: (url: string) => void;
  setDuration?: (duration: number) => void;
};

export default function Upload({ setVideoUrl, setThumbnailUrl, setDuration }: UploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // You must implement this to get the upload auth from your backend
  async function getAuthParams() {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Auth fetch failed");
    return res.json();
  }

  async function onUpload() {
    if (!fileInputRef.current?.files?.length) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInputRef.current.files[0];

    setUploading(true);
    setError(null);

    try {
      const { signature, expire, token, publicKey } = await getAuthParams();

      const uploadResult = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      // ImageKit upload returns the file url as uploadResult.url
      if (setVideoUrl && uploadResult.url) setVideoUrl(uploadResult.url);
      if (setThumbnailUrl && uploadResult.url) setThumbnailUrl(uploadResult.url);

      // Optional: if video, get duration (you need to extract it yourself)
      if (setDuration && file.type.startsWith("video/")) {
        // Extract video duration by loading metadata (client-side)
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          setDuration(video.duration);
        };
        video.src = URL.createObjectURL(file);
      }
    } catch (err) {
      if (err instanceof ImageKitAbortError) {
        setError("Upload aborted");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError("Invalid request");
      } else if (err instanceof ImageKitUploadNetworkError) {
        setError("Network error");
      } else if (err instanceof ImageKitServerError) {
        setError("Server error");
      } else {
        setError("Upload failed");
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }
return (
  <div className="flex flex-col gap-3">
    <input
      ref={fileInputRef}
      type="file"
      accept={setVideoUrl ? "video/*" : "image/*"}
      className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                 dark:file:bg-zinc-800 dark:file:text-white dark:hover:file:bg-zinc-700"
    />

    <button
      type="button"
      onClick={onUpload}
      disabled={uploading}
      className={`px-4 py-2 text-sm font-medium rounded-md w-fit ${
        uploading
          ? "bg-gray-400 cursor-not-allowed text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {uploading ? `Uploading ${progress.toFixed(0)}%` : "Upload"}
    </button>

    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
}
