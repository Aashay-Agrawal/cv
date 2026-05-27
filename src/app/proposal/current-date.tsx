"use client";

import { useEffect, useState } from "react";

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatProposalDate(date: Date) {
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  const monthValue = String(date.getMonth() + 1).padStart(2, "0");
  const dayValue = String(day).padStart(2, "0");

  return {
    dateTime: `${year}-${monthValue}-${dayValue}`,
    label: `${month} ${day}${getOrdinalSuffix(day)}, ${year}`,
  };
}

export function CurrentDate() {
  const [date, setDate] = useState<ReturnType<typeof formatProposalDate> | null>(null);

  useEffect(() => {
    let timeoutId: number;

    function updateDate() {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      setDate(formatProposalDate(now));
      timeoutId = window.setTimeout(
        updateDate,
        nextMidnight.getTime() - now.getTime()
      );
    }

    updateDate();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <time
      dateTime={date?.dateTime}
      className="min-w-[118px] text-neutral-500 sm:justify-self-end"
    >
      {date ? `· ${date.label}` : ""}
    </time>
  );
}
