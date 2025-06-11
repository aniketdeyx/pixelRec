"use client";

import { useRouter } from "next/navigation";

export default function VideoThumbnail({
  video,
  user
}: {
  video: any;
  user: any;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watch/${video.videoId}`)}
      className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition"
    >
      <video
        src={video.videoUrl}
        className="w-full h-48 object-cover"
        muted
        preload="metadata"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-500">By {user.name}</p>
        {video.duration && (
          <p className="text-sm text-gray-500">{Math.floor(video.duration)} sec</p>
        )}
      </div>
    </div>
  );
}
