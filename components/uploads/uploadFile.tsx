"use client";

import React, { useRef } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next";

async function getAuthParams() {
  const res = await fetch("/api/upload-auth");
  if (!res.ok) throw new Error("Failed to get auth params");
  return await res.json();
}

export async function uploadFile(file: File) {
  try {
    const { token, expire, signature, publicKey } = await getAuthParams();

    const res = await upload({
      file,
      fileName: file.name,
      publicKey,
      signature,
      token,
      expire,
    });

    return { url: res.url, isVideo: file.type.startsWith("video") };
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error", error.message);
    } else {
      console.error("Unknown upload error", error);
    }
    throw error;
  }
}

interface UploadProps {
  setVideoUrl?: (url: string) => void;
  setThumbnailUrl?: (url: string) => void;
  setDuration?: (duration: number) => void;
}

export default function Upload({
  setVideoUrl,
  setThumbnailUrl,
  setDuration,
}: UploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url, isVideo } = await uploadFile(file);

      if (isVideo && setVideoUrl && url) {
        setVideoUrl(url);

        if (setDuration) {
          const tempVideo = document.createElement("video");
          tempVideo.src = URL.createObjectURL(file);
          tempVideo.addEventListener("loadedmetadata", () => {
            setDuration(Math.floor(tempVideo.duration));
          });
        }
      } else if (!isVideo && setThumbnailUrl && url) {
        setThumbnailUrl(url);
      }
    } catch (error) {
      // uploadFile logs errors
    }
  };

  return (
    <input
      type="file"
      accept="video/*,image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
    />
  );
}
