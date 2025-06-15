"use client";

import React, { useActionState, useEffect, useState, startTransition } from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from "@/components/ui/select";
import { uploadToSupabase } from "@/actions/uploadToSupabase"; // File uploader
import { uploadVideoAction } from "@/actions/upload";

function Page({ params }: { params: { id: string } }) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState<"public" | "private">("public");

    const [formState, formAction] = useActionState(uploadVideoAction, {
        errors: {},
    });

    useEffect(() => {
        async function fetchVideo() {
            const stored = sessionStorage.getItem("recordedVideo");
            if (stored) {
                const { url, name, type } = JSON.parse(stored);
                await fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], name, { type });
                        setVideoUrl(URL.createObjectURL(file));
                        setVideoFile(file);
                    });
            }
        }
        fetchVideo();

    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!videoFile) {
            alert("No video file found.");
            return;
        }

        // Step 1: Upload file to Supabase
        const videoId = crypto.randomUUID();
        const formFile = new FormData();
        formFile.append("file", videoFile);
        formFile.append("videoId", videoId);

        const { url: uploadedUrl } = await uploadToSupabase(formFile);
        if (!uploadedUrl) {
            alert("Failed to upload video.");
            return;
        }

        // Step 2: Send metadata + video URL to server action
        const metadataForm = new FormData();
        metadataForm.append("videoId", videoId);
        metadataForm.append("title", title);
        metadataForm.append("description", description);
        metadataForm.append("visibility", visibility);
        metadataForm.append("videoUrl", uploadedUrl);
        metadataForm.append("duration", "30"); // Optional placeholder

        // ✅ Wrap formAction inside startTransition
        startTransition(() => {
            formAction(metadataForm);
        });
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row mt-10 gap-10 px-6">
            <div className="flex-1">
                {videoUrl ? (
                    <RemotionPlayer videoUrl={videoUrl} />
                ) : (
                    <p className="text-white">Loading video preview...</p>
                )}
            </div>

            <div className="flex-1 rounded-2xl bg-white shadow-lg p-8">
  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
    
    {/* Title Field */}
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="title" className="font-medium text-gray-700">
        Title
      </Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter video title"
        className="text-sm"
      />
      {formState.errors?.title && (
        <p className="text-sm text-red-500">{formState.errors.title[0]}</p>
      )}
    </div>

    {/* Description Field */}
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="description" className="font-medium text-gray-700">
        Description
      </Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a short description"
        className="text-sm min-h-[100px] resize-none"
      />
    </div>

    {/* Visibility Select */}
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="visibility" className="font-medium bg-white text-gray-700">
        Visibility
      </Label>
      <Select value={visibility}  onValueChange={(val) => setVisibility(val as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Choose visibility" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      className="bg-blue-400 hover:bg-blue-500 transition text-white w-full py-2 rounded-lg"
    >
      Upload Video
    </Button>

    {/* General Form Error */}
    {formState.errors?.formErrors && (
      <p className="text-sm text-red-500 text-center">{formState.errors.formErrors[0]}</p>
    )}
  </form>
</div>

        </main>
    );
}

export default Page;
