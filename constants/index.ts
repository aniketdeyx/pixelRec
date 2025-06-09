export const sampleVideos = [
  {
    id: '1',
    thumbnail: '/assets/images/dummy.jpeg',
    userImg: '/assets/images/thumbnail.jpg',
    username: 'CodeWithSam',
    visibility: 'Public',
    views: 15200,
    title: 'Master React in 30 Minutes!',
    createdAt: new Date('2024-12-01'),
    duration: 780, // 13 minutes
  },
  {
    id: '2',
    thumbnail: '/assets/images/thumbnail.jpg',
    userImg: '/assets/images/thumbnail.jpg',
    username: 'DevNinja',
    visibility: 'Unlisted',
    views: 3400,
    title: 'Next.js 14 Routing Explained',
    createdAt: new Date('2025-01-10'),
    duration: 420,
  },
  {
    id: '3',
    thumbnail: '/assets/images/thumbnail.jpg',
    userImg: '/assets/images/thumbnail.jpg',
    username: 'TechChloe',
    visibility: 'Private',
    views: 790,
    title: 'How to Use Supabase Auth in Your App',
    createdAt: new Date('2025-02-22'),
    duration: 290,
  },
  {
    id: '4',
    thumbnail: '/assets/images/thumbnail.jpg',
    userImg: '/assets/images/thumbnail.jpg',
    username: 'UXBen',
    visibility: 'Public',
    views: 115000,
    title: 'Designing Clean Dashboards with Tailwind CSS',
    createdAt: new Date('2025-03-15'),
    duration: 950,
  }
]

export const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500 MB
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024; // 5 MB


export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};