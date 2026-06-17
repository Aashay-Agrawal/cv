"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type WorkMediaPreloadItem = {
  poster?: string;
  src: string;
  type: "image" | "video";
};

type WorkMediaPreloadResponse = {
  items?: WorkMediaPreloadItem[];
};

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

type WindowWithIdleCallback = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (callback: IdleRequestCallback) => number;
};

function getConnection() {
  const navigatorWithConnection = navigator as NavigatorWithConnection;

  return (
    navigatorWithConnection.connection ??
    navigatorWithConnection.mozConnection ??
    navigatorWithConnection.webkitConnection
  );
}

function shouldSkipMediaPreload() {
  const connection = getConnection();

  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

function isHlsSource(src: string) {
  try {
    return new URL(src, window.location.href).pathname.toLowerCase().endsWith(".m3u8");
  } catch {
    return src.toLowerCase().includes(".m3u8");
  }
}

function preloadImage(src: string) {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function preloadVideoMetadata(src: string) {
  if (isHlsSource(src)) {
    void fetch(src, { cache: "force-cache", mode: "no-cors" }).catch(() => {});
    return;
  }

  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.load();
}

async function preloadWorkMedia() {
  const response = await fetch("/api/work-media/preload", {
    cache: "force-cache",
  });

  if (!response.ok) {
    return;
  }

  const data = (await response.json()) as WorkMediaPreloadResponse;
  const items = data.items ?? [];

  for (const item of items) {
    if (item.type === "image") {
      preloadImage(item.src);
      continue;
    }

    if (item.poster) {
      preloadImage(item.poster);
    }

    preloadVideoMetadata(item.src);
  }
}

export function WorkPreloader() {
  const router = useRouter();

  useEffect(() => {
    const windowWithIdleCallback = window as WindowWithIdleCallback;
    let cancelled = false;
    let idleHandle: number | null = null;
    let fallbackHandle: ReturnType<typeof setTimeout> | null = null;

    const warmWorkPage = () => {
      if (cancelled) {
        return;
      }

      router.prefetch("/work");

      if (!shouldSkipMediaPreload()) {
        void preloadWorkMedia().catch(() => {});
      }
    };

    if (windowWithIdleCallback.requestIdleCallback) {
      idleHandle = windowWithIdleCallback.requestIdleCallback(warmWorkPage, {
        timeout: 2_500,
      });
    } else {
      fallbackHandle = setTimeout(warmWorkPage, 1_200);
    }

    return () => {
      cancelled = true;

      if (idleHandle !== null) {
        windowWithIdleCallback.cancelIdleCallback?.(idleHandle);
      }

      if (fallbackHandle !== null) {
        clearTimeout(fallbackHandle);
      }
    };
  }, [router]);

  return null;
}
