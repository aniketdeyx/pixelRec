"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
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

function Page() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    
    // Trim controls
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd, setTrimEnd] = useState(0);
    const [maxDuration, setMaxDuration] = useState(0);

    const [formState, formAction] = useActionState(uploadVideoAction, {
        errors: {},
    });

    useEffect(() => {
        async function fetchVideo() {
            const stored = sessionStorage.getItem("recordedVideo");
            if (stored) {
                const { url, name, type, duration } = JSON.parse(stored);
                await fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], name, { type });
                        setVideoUrl(URL.createObjectURL(file));
                        setVideoFile(file);
                        setMaxDuration(duration || 0);
                        setTrimEnd(duration || 0); // Set trim end to full duration initially
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
        metadataForm.append("duration", (trimEnd - trimStart).toString()); // Use trimmed duration
        metadataForm.append("trimStart", trimStart.toString());
        metadataForm.append("trimEnd", trimEnd.toString());

        // ✅ Wrap formAction inside startTransition
        startTransition(() => {
            formAction(metadataForm);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `}</style>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Edit Your Recording</h1>
                    <p className="text-gray-600">Add title, description and choose visibility settings for your video</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Video Preview Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Video Preview</h2>
                            <p className="text-sm text-gray-600">Preview how your recording will look</p>
                        </div>
                        <div className="p-6">
                            {videoUrl ? (
                                <div className="space-y-4">
                                    <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                                        <RemotionPlayer videoUrl={videoUrl} duration={maxDuration > 0 ? maxDuration : undefined} />
                                    </div>
                                    
                                    {/* Trim Controls */}
                                    {maxDuration > 0 && (
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                Trim Video
                                            </h3>
                                            
                                            <div className="space-y-3">
                                                {/* Start Time */}
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">Start Time: {trimStart}s</Label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max={maxDuration - 1}
                                                        step="0.1"
                                                        value={trimStart}
                                                        onChange={(e) => setTrimStart(Number(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                    />
                                                </div>
                                                
                                                {/* End Time */}
                                                <div>
                                                    <Label className="text-sm font-medium text-gray-600">End Time: {trimEnd}s</Label>
                                                    <input
                                                        type="range"
                                                        min={trimStart + 1}
                                                        max={maxDuration}
                                                        step="0.1"
                                                        value={trimEnd}
                                                        onChange={(e) => setTrimEnd(Number(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                    />
                                                </div>
                                                
                                                {/* Duration Info */}
                                                <div className="flex justify-between text-sm text-gray-600 bg-white p-3 rounded">
                                                    <span>Original: {maxDuration}s</span>
                                                    <span>Trimmed: {(trimEnd - trimStart).toFixed(1)}s</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9m-4.5-5h.01m-6.938 4h.01M18 10h1.5a2.5 2.5 0 110 5H18m-4.5-5h.01m-6.938 4h.01" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500">Loading video preview...</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Video Details</h2>
                            <p className="text-sm text-gray-600">Add information about your recording</p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                
                                {/* Title Field */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="title" className="font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Title *
                                    </Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="Enter a catchy title for your video"
                                        className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {formState.errors?.title && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {formState.errors.title[0]}
                                        </p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description" className="font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe what your video is about, what viewers will learn, or any important context..."
                                        className="text-sm min-h-[120px] resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>

                                {/* Visibility Select */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="visibility" className="font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Visibility
                                    </Label>
                                    <Select value={visibility} onValueChange={(val) => setVisibility(val as "public" | "private")}>
                                        <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                                            <SelectValue placeholder="Choose who can view your video" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="public" className="flex items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Public
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="private" className="flex items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    Private
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Video
                                </Button>

                                {/* General Form Error */}
                                {formState.errors?.formErrors && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <p className="text-sm text-red-600 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {formState.errors.formErrors[0]}
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
