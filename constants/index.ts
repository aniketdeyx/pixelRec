import {Settings2, Scissors, Share2Icon, CloudCogIcon, Share2} from "lucide-react"

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

export const featureCards = [
  {
    iconClass: Scissors,
    title: "Quick Editing Tools",
    description: "Trim recordings, add annotations, highlight mouse clicks, and more with our intuitive editor.",
  },
  {
    iconClass: Settings2,
    title: "Instant Sharing",
    description: "Generate shareable links or download videos instantly after recording.",
  },
  {
    iconClass: Share2Icon,
    title: "Privacy Controls",
    description: "Choose between public, private, or unlisted visibility for every recording.",
  },
  {
    iconClass: CloudCogIcon,
    title: "Cross-Platform",
    description: "Works seamlessly on all modern browsers across Windows, macOS, and Linux.",
  },
  {
    iconClass: Share2Icon,
    title: "High Performance",
    description: "Optimized for minimal CPU usage and smooth video capture even on low-end devices.",
  },
  {
    iconClass: Share2Icon,
    title: "Custom Branding",
    description: "Add logos, themes, and watermarks to personalize your videos.",
  },
];
