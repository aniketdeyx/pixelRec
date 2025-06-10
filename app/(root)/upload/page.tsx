"use client";

import { uploadVideoAction } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/uploads/uploadFile"; // Your Upload component
import { useActionState, useEffect, useState } from "react";

export default function UploadVideoFormFields() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [duration, setDuration] = useState<number | null>(null);

  const [formState, formAction, isPending] = useActionState(uploadVideoAction, {
    errors: {},
  });

  useEffect(() => {
    // Load recorded video from sessionStorage, convert to File, and set video URL and duration automatically
    const checkForRecordedVideo = async () => {
      try {
        const storedData = sessionStorage.getItem("recordedVideo");
        if (storedData) {
          const { url, name, type, duration } = JSON.parse(storedData);
          const blob = await fetch(url).then((res) => res.blob());
          const file = new File([blob], name, { type, lastModified: Date.now() });

          // Upload the file using the same Upload logic (we’ll create a helper for this)
          const { url: uploadedUrl } = await uploadFile(file);
          uploadedUrl && setVideoUrl(uploadedUrl);
          setDuration(duration); // from stored metadata
        }
      } catch (error) {
        console.error("Error retrieving recorded video:", error);
      }
    };
    checkForRecordedVideo();
  }, []);

  return (
    <form
      action={formAction}
      className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6 border border-gray-200 dark:border-zinc-700"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Upload New Video
      </h2>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">
          Title
        </Label>
        <Input id="title" name="title" placeholder="Enter title" />
        {formState.errors?.title && (
          <p className="text-sm text-red-500">{formState.errors.title[0]}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter video description"
          rows={4}
        />
        {formState.errors?.description && (
          <p className="text-sm text-red-500">{formState.errors.description[0]}</p>
        )}
      </div>

      {/* Visibility */}
      <div className="space-y-2 bg-white">
        <Label htmlFor="visibility" className="text-base">
          Visibility
        </Label>
        <Select name="visibility">
          <SelectTrigger>
            <SelectValue placeholder="Choose visibility" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
        {formState.errors?.visibility && (
          <p className="text-sm text-red-500">{formState.errors.visibility[0]}</p>
        )}
      </div>

      {/* Upload Video */}
      <div className="space-y-2">
        <Label className="text-base">Upload Video</Label>
        <Upload setVideoUrl={setVideoUrl} setDuration={setDuration} />
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            className="w-full rounded-lg border border-gray-300"
          />
        )}
        <input type="hidden" name="videoUrl" value={videoUrl} />
        <input type="hidden" name="duration" value={duration ?? ""} />
      </div>

      {/* Upload Thumbnail */}
      <div className="space-y-2">
        <Label className="text-base">Upload Thumbnail</Label>
        <Upload setThumbnailUrl={setThumbnailUrl} />
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Thumbnail preview"
            className="w-full rounded-lg border border-gray-300"
          />
        )}
        <input type="hidden" name="thumbnailUrl" value={thumbnailUrl} />
      </div>


      {/* Form Error */}
      {formState.errors?.formErrors && formState.errors.formErrors.length > 0 && (
        <div className="text-red-500 text-sm space-y-1">
          {formState.errors.formErrors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" className="w-full">
          {isPending ? "Uploading..." : "Upload Video"}
        </Button>
      </div>
    </form>
  );
}

// IMPORT uploadFile helper here at the top
import { uploadFile } from "@/components/uploads/uploadFile";
