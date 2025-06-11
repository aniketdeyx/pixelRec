import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react'
import Dropdown from './Dropdown';
import { Button } from './ui/button';
import RecordScreen from './RecordScreen';

interface SharedHeaderProps {
    subHeader: string;
    title: string;
    userImg?: string;
}

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {


    return (
        <header className='mt-9 max-w-[95%] mx-auto'>
            <div className='lg:flex lg:items-center lg:justify-between'>
                <div className='flex items-center gap-3'>
                    {userImg && (
                        <Image
                            src={userImg}
                            alt="User Profile"
                            width={50}
                            height={50}
                            style={{ width: '100px', height: '100px' }}
                            className="rounded-full"
                        />
                    )}

                    <div>
                        <h3 className='text-2xl font-bold'>{title}</h3>
                        <p className='text-gray-500 text-sm'>{subHeader}</p>
                    </div>
                </div>

                <div className='flex gap-2 mt-5  lg:mt-0'>
                    <Link href="/upload">
                        <Button className='bg-[#5271FF] text-white'>Upload a video</Button>
                    </Link>
                    <RecordScreen />
                </div>
            </div>x
            <div className="relative mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className='lg:w-1/3 relative w-full'>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                        <Search className="w-4 h-4" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search for videos"
                        className="w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-full focus:outline-zinc-900"
                    />
                </div>
                <Dropdown />
            </div>
        </header>)
}

export default Header