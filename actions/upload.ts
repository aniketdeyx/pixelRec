"use server";

import { db } from "@/drizzle/db";
import { videos } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type UploadFormState = {
  errors: {
    title?: string[];
    description?: string[];
    thumbnailUrl?: string[];
    videoUrl?: string[];
    visibility?: string[];
    duration?: string[];
    formErrors?: string[];
  };
};
const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
  videoUrl: z.string().url("Video URL must be valid"),
  thumbnailUrl: z.preprocess(val => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, z.string().url("Thumbnail URL must be valid").optional()),
  duration: z.preprocess(val => {
    if (typeof val === "string") {
      if (val.trim() === "") return undefined;
      const parsed = parseFloat(val);
      if (isNaN(parsed)) return undefined;
      return parsed;
    }
    return val;
  }, z.number().optional()),
});

export async function uploadVideoAction(
  prevState: UploadFormState,
  formData: FormData
): Promise<UploadFormState> {
  const result = videoSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  type VideoFormData = z.infer<typeof videoSchema>;
  const data: VideoFormData = result.data;

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    console.log("User ID from session:", userId);
    if (!userId) {
      return {
        errors: {
          formErrors: ["You must be logged in to upload a video"],
        },
      };
    }

    const { title, description, visibility, videoUrl, thumbnailUrl, duration } = data;


    await db.insert(videos).values({
      title,
      description: description || "",
      visibility,
      videoUrl,
      thumbnailUrl: thumbnailUrl || "",
      userId,
      views: 0,
      duration: duration ? Math.floor(duration) : null,
    });

    revalidatePath("/");
  } catch (error) {
  console.error("Upload error:", error); // Logs actual error

  return {
    errors: {
      formErrors: [
        typeof error === "string"
          ? error
          : error instanceof Error && error.message
          ? error.message
          : "Something went wrong during upload",
      ],
    },
  };
}
redirect("/");
}
