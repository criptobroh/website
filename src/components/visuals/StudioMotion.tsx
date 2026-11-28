"use client";

import { useEffect, useRef } from "react";

// A brief silent opening shot. The server-rendered photograph is always the fallback.
export default function StudioMotion() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = video.previousElementSibling?.querySelector("img");
    if (!still) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = window.matchMedia("(max-width: 660px) and (orientation: portrait), (max-width: 430px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (motion.matches || connection?.saveData) return;

    let cancelled = false;
    function stop() {
      cancelled = true;
      if (!video) return;
      video.pause();
      delete video.dataset.visible;
    }
    function visibility() {
      if (document.hidden) stop();
    }

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || cancelled || document.hidden) return;
      observer.disconnect();
      try {
        await still.decode();
        if (cancelled || still.getBoundingClientRect().bottom <= 0) return;
        const frame = portrait.matches ? "portrait" : "landscape";
        video.src = `/images/studio-hero/${frame}-motion.mp4`;
        video.muted = true;
        await video.play();
        if (!cancelled) video.dataset.visible = "true";
      } catch {
        stop();
      }
    });
    observer.observe(still);
    motion.addEventListener("change", stop);
    portrait.addEventListener("change", stop);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stop);
      portrait.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", visibility);
      stop();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return <video ref={ref} muted playsInline preload="none" aria-hidden="true" disablePictureInPicture />;
}
