import { getAllVideosAction } from '@/actions/upload';
import Header from '@/components/Header'
import Videocard from '@/components/Videocard'
import { sampleVideos } from '@/constants'
import React from 'react'


declare interface SearchParams {
  searchParams: Promise<Record<string, string | undefined>>;
}

const Home = async({searchParams}: SearchParams) => {

  const {query, filter, page} = await searchParams;
  const {videos, pagination} = await getAllVideosAction(query, filter, Number(page) || 1)
  return (
    <div>
  <Header subHeader="Public Library" title="All videos" />
  {
    videos?.length > 0 ? (
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {videos.map(({ video, user }) => (
          <Videocard
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnailUrl}
            createdAt={video.createdAt}
            userImg={user?.image ?? ""}
            username={user?.name ?? "Guest"}
            views={video.views}
            visibility={video.visibility}
            duration={video.duration ?? undefined}
          />
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 py-10">No videos found</div>
    )
  }
</div>

  )
}

export default Home