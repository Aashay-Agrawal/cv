"use client";

import { Pdf02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function PrintButton() {
  return (
    <button
      type="button"
      aria-label="Print or save proposal as PDF"
      onClick={() => window.print()}
      className="proposal-print-hidden group fixed right-[calc(env(safe-area-inset-right)+18px)] bottom-[calc(env(safe-area-inset-bottom)+18px)] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#E4F1FF] bg-white text-[#007CFF] shadow-[0_2px_2px_#00000012,0_14px_24px_#007CFF1F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B9DCFF] hover:bg-[#F7FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007CFF]"
    >
      <span className="pointer-events-none absolute right-0 bottom-[calc(100%+10px)] max-w-[180px] translate-y-1 scale-95 whitespace-nowrap rounded-[7px] bg-black px-2.5 py-1.5 text-[10px] font-medium leading-none text-white opacity-0 shadow-[0_8px_20px_#00000024] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        Save as PDF
      </span>
      <HugeiconsIcon icon={Pdf02Icon} size={22} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
