import {Settings2, Scissors, Share2, Monitor, Zap, Palette, Play, Square, Upload} from "lucide-react"

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
    iconClass: Share2,
    title: "Instant Sharing",
    description: "Generate shareable links or download videos instantly after recording.",
  },
  {
    iconClass: Settings2,
    title: "Privacy Controls",
    description: "Choose between public, private, or unlisted visibility for every recording.",
  },
  {
    iconClass: Monitor,
    title: "Cross-Platform",
    description: "Works seamlessly on all modern browsers across Windows, macOS, and Linux.",
  },
  {
    iconClass: Zap,
    title: "High Performance",
    description: "Optimized for minimal CPU usage and smooth video capture even on low-end devices.",
  },
  {
    iconClass: Palette,
    title: "Custom Branding",
    description: "Add logos, themes, and watermarks to personalize your videos.",
  },
];

export const howItWorks = [
  {
    iconClass: Play,
    title: "Start Recording",
    description: "Click the record button and select your screen to start capturing your content instantly.",
  },
  {
    iconClass: Square,
    title: "Stop & Review",
    description: "Stop recording when done and review your video with our built-in player.",
  },
  {
    iconClass: Upload,
    title: "Edit & Share",
    description: "Add titles, descriptions, and privacy settings, then share your video with the world.",
  },
];