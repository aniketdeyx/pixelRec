"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function uploadToSupabase(formData: FormData) {

const file = formData.get("file") as File;

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
