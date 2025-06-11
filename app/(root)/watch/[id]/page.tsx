import { getVideoByIdAction } from "@/actions/upload";
import { notFound } from "next/navigation";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  console.log("Fetching video with ID:", id);
  const data = await getVideoByIdAction(id);

  if (!data) return notFound();

  const { video, user } = data;

  return (
    <div>
      <h1>{video.title}</h1>
      <p>Uploaded by: {user!.name}</p>
      {/* Your player here */}
    </div>
  );
}
