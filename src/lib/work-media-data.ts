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



"https://cdn.cosmos.so/0504161f-654b-4758-aee1-a50c6cb158b9?format=webp&w=2048",

"https://d2w9rnfcy7mm78.cloudfront.net/47339285/original_dc087bccac95221e6b35877b5ab40854.png?1782499479?bc=0",

];


