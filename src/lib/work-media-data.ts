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
"https://d2w9rnfcy7mm78.cloudfront.net/46782762/original_1001639792a7a114425c72688b3f7102.png?1780688700?bc=0",


];


