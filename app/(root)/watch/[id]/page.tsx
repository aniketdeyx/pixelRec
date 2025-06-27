import { getVideoByIdAction } from "@/actions/upload";
import { notFound } from "next/navigation";
import { Eye, Calendar, User, Play, Clock, Share } from "lucide-react";
import Image from "next/image";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getVideoByIdAction(id);

  if (!data) return notFound();

  const { video, user } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Unified Video and Info Container */}
        <div className="bg-white rounded-2xl py-5 shadow-xl overflow-hidden ring-1 ring-gray-200">
          {/* Video Player Section */}
          <div className="relative aspect-video group max-w-3xl mx-auto">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full rounded-2xl object-cover"
              preload="metadata"
            />
            {/* Optional: Custom play button overlay when paused */}
            
          </div>

          {/* Video Information Section */}
          <div className="p-6 md:p-8">
            {/* Title and Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex-1">
                {video.title}
              </h1>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Creator and Stats Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
              {/* Creator Info */}
              <div className="flex items-center gap-4">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-gray-200 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{user?.name}</p>
                 
                </div>
              </div>

              {/* Video Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{video.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
                {video.duration && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{Math.floor(video.duration)}s</span>
                  </div>
                )}
                <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold uppercase tracking-wide">
                  {video.visibility}
                </div>
              </div>
            </div>

            {/* Description */}
            {video.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Description
                </h3>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {video.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
