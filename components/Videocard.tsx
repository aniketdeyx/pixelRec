import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { EyeIcon } from 'lucide-react'
import { Button } from './ui/button'

interface VideoCardProps {
    id: string,
    thumbnail: string,
    userImg: string,
    username: string,
    views: number,
    title: string,
    createdAt: Date,
    duration?: number,
}

const Videocard = ({ id, title, thumbnail, userImg, username, views, createdAt, duration }: VideoCardProps) => {
    return (
        <div className='lg:max-w-[26vw] min-h-0'>
            <Link href={`/video/${id}`} className="flex relative flex-col gap-2 p-2 rounded-2xl bg-white shadow-md ">
                <Image
                    src={thumbnail}
                    width={320}
                    height={160}
                    alt="thumbnail"
                    className="rounded-xl mx-auto h-[20vh] object-cover aspect-video"
                />
                {duration !== null && (
                    <div className="duration absolute top-38 right-4 lg:top-33 lg:right-4 bg-gray-700 text-sm px-2 py-1 text-white">
                        {`${Math.floor(duration! / 60)}:${(Math.floor(duration! % 60)).toString().padStart(2, '0')}`}
                    </div>
                )}

                <article>
                    <div className='flex items-center justify-between'>
                        <figure className='flex items-center gap-2'>
                            <Image
                                src={userImg}
                                width={34}
                                height={34}
                                alt="avatar"
                                className="rounded-full aspect-square"
                            />
                            <h3>{username}</h3>


                        </figure>

                        <aside>
                            <EyeIcon className="w-3 h-3 inline" />
                            <span className='text-sm'>{views}</span>
                        </aside>


                    </div>

                    <h2 >
                        <span className='text-lg font-semibold mt-2 line-clamp-1'>{title}</span> -{" "}
                        <span className='text-sm text-gray-500'>
                            {createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </h2>
                </article>
                <Button className="copy-btn">
                    {/* <Image
          src={
            copied ? "/assets/icons/checkmark.svg" : "/assets/icons/link.svg"
          }
          alt="Copy Link"
          width={18}
          height={18}
        /> */}
                </Button>

            </Link>
        </div>
    )
}

export default Videocard