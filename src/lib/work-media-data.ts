export type WorkMediaType = "image" | "video";

export type CdnWorkMediaData =
  | string
  | {
      alt?: string;
      autoPlay?: boolean;
      controls?: boolean;
      height?: number;
      loop?: boolean;
      muted?: boolean;
      playsInline?: boolean;
      poster?: string;
      src: string;
      type?: WorkMediaType;
      width?: number;
    };

// Add CDN-hosted work media here.
// Plain links are auto-detected by extension. Use an object when a URL does not
// end in a normal image/video extension, or when you want a poster/alt label.
export const cdnWorkMedia: CdnWorkMediaData[] = [
  "https://framerusercontent.com/images/5nha0DNSbZjjmauZoLwQ96e4c.png?lossless=1&width=1440&height=1080",

  "https://framerusercontent.com/assets/ity6Po9Mp5dbXjdaZGxzKDlDQuY.mp4",

  "https://media.contra.com/video/upload/fl_progressive/w_1600/zqs2zs2hryfttjnv3xaa.mp4",
  
  "https://media.contra.com/video/upload/fl_progressive/w_1200/nlvko77ihanov0wyle08.mp4",
  
];
