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
"https://cdn.cosmos.so/3972a5b1-4669-4350-b7a2-443c5a2d1de2?format=webp&w=2048",

"https://cdn.cosmos.so/d63938c3-9042-43ce-a59c-713f5eafb4cd?format=webp&w=2048",

];


