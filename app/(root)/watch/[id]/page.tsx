import { getVideoByIdAction } from "@/actions/upload";
import { notFound } from "next/navigation";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getVideoByIdAction(id);

  if (!data) return notFound();

  const { video, user } = data;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Video Player */}
        <div className="w-full h-auto aspect-video mb-6">
          <video
            src={video.videoUrl}
            controls
            className="w-full h-full rounded-lg shadow"
          />
        </div>

        {/* Video Info */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{video.title}</h1>

        <div className="text-sm text-gray-600 mb-4">
          <p>
            Uploaded by <span className="font-semibold">{user?.name}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{video.visibility} • {video.views.toLocaleString()} views</p>
        </div>

        {video.description && (
          <div className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed">
            {video.description}
          </div>
        )}
      </div>
    </div>
  );
}
