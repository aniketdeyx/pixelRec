"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadToSupabase(formData: FormData) {

const file = formData.get("file") as File;
const videoId = formData.get("videoId") as string;

if (!file) {
  return { error: "No file provided" };
}
  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabaseServer.storage
    .from("videos")
    .upload(`recordings/${Date.now()}.webm`, buffer, {
      contentType: file.type,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return { error: error.message };
  }

  const { data: publicUrlData } = supabaseServer
    .storage
    .from("videos")
    .getPublicUrl(data.path);

  return {
    url: publicUrlData?.publicUrl,

  };
}
