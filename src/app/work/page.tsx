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

export const metadata = {
  title: "Work | Aashay Agrawal",
  description: "Artifacts of my Design Experiments",
};

const WORK_DIR = path.join(process.cwd(), "public", "work");

type WorkImageData = {
  height: number;
  src: string;
  width: number;
};

async function getPngDimensions(filePath: string) {
  const buffer = await readFile(filePath);

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function getWorkImages() {
  try {
    const files = await readdir(WORK_DIR);

    return Promise.all(
      files
        .filter((file) => file.toLowerCase().endsWith(".png"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(async (file): Promise<WorkImageData> => {
          const dimensions = await getPngDimensions(path.join(WORK_DIR, file));

          return {
            src: `/work/${encodeURIComponent(file)}`,
            ...dimensions,
          };
        })
    );
  } catch {
    return [];
  }
}

function WorkImage({ height, src, width }: WorkImageData) {
  return (
    // Natural image dimensions keep mixed-height PNGs flowing in the masonry columns.
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="mb-[6px] block h-auto w-full break-inside-avoid rounded-[8px] border border-[#F3F3F3]"
      loading="lazy"
    />
  );
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
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+14px)] left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#F5F5F5] bg-white p-1 shadow-[0_2px_2px_#00000014,0_12px_20px_#0000001F]"
    >
      <BarIconLink href="/" label="Back to home">
        <WorkBarIcon icon={ArrowLeft02Icon} />
      </BarIconLink>
      <BarIconLink href={twitter} label="X (Twitter)" external>
        <WorkBarIcon icon={NewTwitterIcon} />
      </BarIconLink>
      <BarIconLink href={calendar} label="Schedule a meeting" external>
        <WorkBarIcon icon={Calendar03Icon} />
      </BarIconLink>
      <BarIconLink href={instagram} label="Instagram" external>
        <WorkBarIcon icon={InstagramIcon} className="scale-[1.05]" />
      </BarIconLink>
      <a
        href={freelance}
        className="flex h-9 items-center justify-center rounded-full bg-neutral-950 px-3.5 text-sm font-medium leading-5 text-neutral-50 transition-colors duration-200 hover:bg-[#007CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007CFF]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Work with me
      </a>
    </nav>
  );
}

export default async function WorkPage() {
  const images = await getWorkImages();
  const { contact, socials } = await getPortfolioData();
  const twitter = socials.find((social) => social.label === "Twitter")?.href ?? "";
  const instagram =
    socials.find((social) => social.label === "Instagram")?.href ?? "";

  return (
    <main className="page-enter-from-bottom font-mono min-h-screen bg-white p-[10px] pb-24 text-neutral-900">
      <FloatingWorkBar
        calendar={contact.calendar}
        freelance={contact.freelance}
        instagram={instagram}
        twitter={twitter}
      />
      {images.length > 0 ? (
        <div className="columns-2 gap-[6px]">
          {images.map((image) => (
            <WorkImage key={image.src} {...image} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
