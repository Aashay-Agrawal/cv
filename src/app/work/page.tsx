import { readFile, readdir } from "node:fs/promises";
import {
  ArrowLeft02Icon,
  Calendar03Icon,
  InstagramIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import path from "node:path";
import type { ReactNode } from "react";
import type { IconSvgElement } from "@hugeicons/react";
import { getPortfolioData } from "@/lib/data";
import { cdnWorkMedia } from "@/lib/work-media-data";
import type { CdnWorkMediaData, WorkMediaType } from "@/lib/work-media-data";
import { WorkVideo } from "./work-video";

export const metadata = {
  title: "Artifacts",
  description: "Artifacts of my Design Experiments",
};

const WORK_DIR = path.join(process.cwd(), "public", "work");
const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([
  ".m3u8",
  ".m4v",
  ".mov",
  ".mp4",
  ".ogg",
  ".ogv",
  ".webm",
]);

type WorkMediaData = {
  alt?: string;
  autoPlay?: boolean;
  controls?: boolean;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  src: string;
  type: WorkMediaType;
  width?: number;
};

function getUrlPathname(src: string) {
  try {
    return new URL(src, "https://local.invalid").pathname;
  } catch {
    return src;
  }
}

function getExtension(src: string) {
  return path.extname(getUrlPathname(src)).toLowerCase();
}

function getMediaType(src: string, type?: WorkMediaType): WorkMediaType | null {
  if (type) {
    return type;
  }

  const extension = getExtension(src);

  if (IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }

  if (VIDEO_EXTENSIONS.has(extension)) {
    return "video";
  }

  return null;
}

function getPngDimensions(buffer: Buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function getJpegDimensions(buffer: Buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      break;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  return null;
}

async function getImageDimensions(filePath: string) {
  try {
    const buffer = await readFile(filePath);
    const extension = getExtension(filePath);

    if (extension === ".png") {
      return getPngDimensions(buffer);
    }

    if (extension === ".jpg" || extension === ".jpeg") {
      return getJpegDimensions(buffer);
    }
  } catch {
    return null;
  }

  return null;
}

async function getLocalWorkMedia() {
  try {
    const files = await readdir(WORK_DIR);

    const media = await Promise.all(
      files
        .filter((file) => getMediaType(file) !== null)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(async (file): Promise<WorkMediaData> => {
          const type = getMediaType(file) ?? "image";
          const src = `/work/${encodeURIComponent(file)}`;

          if (type === "video") {
            return { src, type };
          }

          const dimensions = await getImageDimensions(path.join(WORK_DIR, file));

          return {
            src,
            type,
            width: dimensions?.width ?? 1440,
            height: dimensions?.height ?? 1080,
          };
        })
    );

    return media;
  } catch {
    return [];
  }
}

function getCdnImageDimensions(src: string, media: CdnWorkMediaData) {
  if (typeof media === "object" && media.width && media.height) {
    return {
      width: media.width,
      height: media.height,
    };
  }

  const url = new URL(src, "https://local.invalid");
  const width = Number(url.searchParams.get("width") ?? url.searchParams.get("w"));
  const height = Number(url.searchParams.get("height") ?? url.searchParams.get("h"));

  return {
    width: Number.isFinite(width) && width > 0 ? width : 1440,
    height: Number.isFinite(height) && height > 0 ? height : 1080,
  };
}

function getCdnWorkMedia(): WorkMediaData[] {
  const media: Array<WorkMediaData | null> = cdnWorkMedia.map((media) => {
      const src = typeof media === "string" ? media : media.src;
      const type = getMediaType(src, typeof media === "string" ? undefined : media.type);

      if (!type) {
        return null;
      }

      if (type === "video") {
        return {
          src,
          type,
          alt: typeof media === "string" ? "" : media.alt ?? "",
          autoPlay: typeof media === "string" ? undefined : media.autoPlay,
          controls: typeof media === "string" ? undefined : media.controls,
          loop: typeof media === "string" ? undefined : media.loop,
          muted: typeof media === "string" ? undefined : media.muted,
          playsInline: typeof media === "string" ? undefined : media.playsInline,
          poster: typeof media === "string" ? undefined : media.poster,
        };
      }

      const dimensions = getCdnImageDimensions(src, media);

      return {
        src,
        type,
        alt: typeof media === "string" ? "" : media.alt ?? "",
        ...dimensions,
      };
    });

  return media.filter((item): item is WorkMediaData => item !== null);
}

function WorkImage({ alt = "", height = 1080, src, width = 1440 }: WorkMediaData) {
  const className =
    "mb-[6px] block h-auto w-full break-inside-avoid rounded-[8px] border border-[#F3F3F3]";
  const isRemote = src.startsWith("http://") || src.startsWith("https://");

  if (isRemote) {
    return (
      // Remote image hosts can be added freely in the data file without editing next.config.ts.
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    // Natural image dimensions keep mixed-height PNGs flowing in the masonry columns.
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
}

function WorkMedia(media: WorkMediaData) {
  if (media.type === "video") {
    return <WorkVideo {...media} />;
  }

  return <WorkImage {...media} />;
}

function WorkBarIcon({
  className = "",
  icon,
}: {
  className?: string;
  icon: IconSvgElement;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={16}
      strokeWidth={1.8}
      aria-hidden="true"
      className={`h-4 w-4 flex-shrink-0 ${className}`}
    />
  );
}

function BarIconLink({
  href,
  label,
  children,
  external = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F9F9F9] text-zinc-500 transition-colors duration-200 hover:bg-[#F1F1F1] hover:text-[#007CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007CFF]";
  const content = (
    <>
      <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-30 max-w-[180px] -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap rounded-[7px] bg-black px-2.5 py-1.5 text-[10px] font-medium leading-none text-white opacity-0 shadow-[0_8px_20px_#00000024] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        {label}
      </span>
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        aria-label={label}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {content}
    </Link>
  );
}

function FloatingWorkBar({
  calendar,
  freelance,
  instagram,
  twitter,
}: {
  calendar: string;
  freelance: string;
  instagram: string;
  twitter: string;
}) {
  return (
    <nav
      aria-label="Work page shortcuts"
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+14px)] left-1/2 z-[999] flex max-w-[calc(100vw-20px)] -translate-x-1/2 items-center gap-1 rounded-full border border-[#F5F5F5] bg-white p-1 font-mono shadow-[0_2px_2px_#00000014,0_12px_20px_#0000001F]"
    >
      <BarIconLink href="/" label="Back to home">
        <WorkBarIcon icon={ArrowLeft02Icon} />
      </BarIconLink>
      <BarIconLink href={twitter} label="X (Twitter)" external>
        <WorkBarIcon icon={NewTwitterIcon}  className="scale-[0.90]"/>
      </BarIconLink>
      <BarIconLink href={calendar} label="Schedule a meeting" external>
        <WorkBarIcon icon={Calendar03Icon} />
      </BarIconLink>
      <BarIconLink href={instagram} label="Instagram" external>
        <WorkBarIcon icon={InstagramIcon} className="scale-[1.05]" />
      </BarIconLink>
      <a
        href={freelance}
        className="flex h-9 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-neutral-950 px-3.5 text-sm font-medium leading-5 text-neutral-50 transition-colors duration-200 hover:bg-[#007CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007CFF]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Work with me
      </a>
    </nav>
  );
}

export default async function WorkPage() {
  const media = [...(await getLocalWorkMedia()), ...getCdnWorkMedia()];
  const { contact, socials } = await getPortfolioData();
  const twitter = socials.find((social) => social.label === "Twitter")?.href ?? "";
  const instagram =
    socials.find((social) => social.label === "Instagram")?.href ?? "";

  return (
    <>
      <FloatingWorkBar
        calendar={contact.calendar}
        freelance={contact.freelance}
        instagram={instagram}
        twitter={twitter}
      />
      <main className="page-enter-from-bottom relative min-h-screen bg-white font-mono text-neutral-900">
        {media.length > 0 ? (
          <div className="columns-1 gap-[6px] p-[10px] sm:columns-2">
            {media.map((item) => (
              <WorkMedia key={item.src} {...item} />
            ))}
          </div>
        ) : null}
      </main>
    </>
  );
}
