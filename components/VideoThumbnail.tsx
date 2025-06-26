"use client";

import { useRouter } from "next/navigation";
import { Play, Clock, User } from "lucide-react";
import Image from "next/image";

type VideoType = {
  videoId: string;
  videoUrl: string;
  title: string;
  duration?: number;
};

type UserType = {
  name: string;
  image?: string;
};

export default function VideoThumbnail({
  video,
  user
}: {
  video: VideoType;
  user: UserType;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watch/${video.videoId}`)}
      className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
    >
      {/* Video Thumbnail Container */}
      <div className="relative overflow-hidden">
        <video
          src={video.videoUrl}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          muted
          preload="metadata"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-blue-600 fill-current" />
          </div>
        </div>
        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {Math.floor(video.duration)}s
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={24}
              height={24}
              className="rounded-full border border-gray-200"
            />
          ) : (
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          )}
          <span className="font-medium">{user.name}</span>
        </div>
      </div>
    </div>
  );
}
