"use server";

import { db } from "@/drizzle/db";
import { user, videos } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq, or, sql } from "drizzle-orm";
import { doesTitleMatch, getOrderByClause } from "@/lib/utils";

// Helper function to build the query for fetching videos with user details
const buildVideoWithUserQuery = () =>
  db
    .select({
      video: videos,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(videos)
    .leftJoin(user, eq(videos.userId, user.id));

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
  videoId: z.string().min(1, "Video ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
  videoUrl: z.string().url("Video URL must be valid"),
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

    if (!userId) {
      return {
        errors: {
          formErrors: ["You must be logged in to upload a video"],
        },
      };
    }

    const { videoId, title, description, visibility, videoUrl, duration } = data;

    await db.insert(videos).values({
      videoId,
      title,
      description: description || "",
      visibility,
      videoUrl,
      userId,
      views: 0,
      duration: duration ? Math.floor(duration) : null,
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Upload error:", error);

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

export const getAllVideosAction = async (
  searchQuery: string = '',
  sortFilter?: string,
  pageNumber: number = 1,
  pageSize: number = 8
) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user?.id;

    const visibilityCondition = or(
      eq(videos.visibility, "public"),
      eq(videos.userId, currentUserId!)
    );

    const whereConditions = searchQuery.trim()
      ? and(visibilityCondition, doesTitleMatch(videos, searchQuery))
      : visibilityCondition;

    const [{ totalCount }] = await db
      .select({ totalCount: sql<number>`count(*)` }) // ✅ Fixed
      .from(videos)
      .where(whereConditions);

    const totalVideos = Number(totalCount || 0);
    const totalPages = Math.ceil(totalVideos / pageSize);

    const videoRecords = await buildVideoWithUserQuery()
      .where(whereConditions)
      .orderBy(
        sortFilter ? getOrderByClause(sortFilter) : sql`${videos.createdAt} DESC` // ✅ Fixed
      )
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);

    return {
      videos: videoRecords,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalVideos,
        pageSize
      }
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      videos: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalVideos: 0,
        pageSize
      }
    };
  }
};

export const getVideoByIdAction = async (id: string) => {
  const [videoRecord] = await buildVideoWithUserQuery()
    .where(eq(videos.videoId, id));

  return videoRecord;
};
