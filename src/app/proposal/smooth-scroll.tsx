"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);

export function ProposalSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });

    function handleContentsClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>(
        "[data-proposal-contents] a[href^='#']"
      );

      if (!anchor?.hash) {
        return;
      }

      const section = document.getElementById(anchor.hash.slice(1));

      if (!section) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", anchor.hash);
      lenis.scrollTo(section, {
        duration: 0.95,
        easing: easeOutQuart,
      });
    }

    document.addEventListener("click", handleContentsClick);

    return () => {
      document.removeEventListener("click", handleContentsClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
