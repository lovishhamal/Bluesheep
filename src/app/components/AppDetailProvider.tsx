"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "../util/useIsMobile";

type AppDetailContextValue = {
  bannerText?: string | null;
  adminPhone?: string | null;
};

const AppDetailContext = createContext<AppDetailContextValue>({});

export function AppDetailProvider({
  bannerText,
  adminPhone,
  children,
}: AppDetailContextValue & { children: React.ReactNode }) {
  const defaultBannerText =
    "🅿️ Free Parking • Secure & Spacious • For All Guests • 🔥 Campfire Evenings • Warm & Cozy Vibes • ";
  const isMobile = useIsMobile();
  const marqueeText = useMemo(() => {
    const value = typeof bannerText === "string" ? bannerText.trim() : "";
    return value ? (value.endsWith(" ") ? value : `${value} `) : defaultBannerText;
  }, [bannerText]);
  const [marqueeDurationSeconds, setMarqueeDurationSeconds] = useState(20);
  const [marqueeDistancePx, setMarqueeDistancePx] = useState(0);
  const [marqueeRepeatCount, setMarqueeRepeatCount] = useState(2);
  const marqueeContainerRef = useRef<HTMLDivElement | null>(null);
  const marqueeBaseMeasureRef = useRef<HTMLSpanElement | null>(null);
  const marqueeMeasureRef = useRef<HTMLSpanElement | null>(null);
  const marqueeSpeedRef = useRef<number | null>(null);

  useEffect(() => {
    marqueeSpeedRef.current = null;
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const baselineSeconds = isMobile ? 10 : 20;

    const measure = () => {
      const containerEl = marqueeContainerRef.current;
      const baseEl = marqueeBaseMeasureRef.current;
      const currentEl = marqueeMeasureRef.current;

      if (!containerEl || !baseEl || !currentEl) return;

      const baseWidth = baseEl.scrollWidth || baseEl.getBoundingClientRect().width || 0;
      const currentWidth =
        currentEl.scrollWidth || currentEl.getBoundingClientRect().width || 0;
      const containerWidth =
        containerEl.clientWidth || containerEl.getBoundingClientRect().width || 0;

      if (!baseWidth || !currentWidth || !containerWidth) return;

      const defaultSpeed = baseWidth / Math.max(1, baselineSeconds);
      const speedFromRef = marqueeSpeedRef.current;
      const speed =
        typeof speedFromRef === "number" && speedFromRef > 0 ? speedFromRef : defaultSpeed;
      marqueeSpeedRef.current = speed;

      const durationSeconds = currentWidth / speed;
      setMarqueeDurationSeconds(
        Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : baselineSeconds
      );
      setMarqueeDistancePx(currentWidth || baseWidth);
      setMarqueeRepeatCount(Math.max(2, Math.ceil(containerWidth / currentWidth) + 2));
    };

    measure();

    const rafId = window.requestAnimationFrame(measure);
    const timeoutId = window.setTimeout(measure, 250);

    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
    const fontsReady = fonts?.ready;
    if (fontsReady) fontsReady.finally(() => measure());

    const ResizeObserverConstructor =
      typeof window.ResizeObserver === "function" ? window.ResizeObserver : null;

    if (!ResizeObserverConstructor) {
      window.addEventListener("resize", measure);
      return () => {
        window.removeEventListener("resize", measure);
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(timeoutId);
      };
    }

    const resizeObserver = new ResizeObserverConstructor(measure);
    if (marqueeContainerRef.current) resizeObserver.observe(marqueeContainerRef.current);
    if (marqueeBaseMeasureRef.current) resizeObserver.observe(marqueeBaseMeasureRef.current);
    if (marqueeMeasureRef.current) resizeObserver.observe(marqueeMeasureRef.current);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [isMobile, marqueeText]);

  const value = useMemo(
    () => ({
      bannerText,
      adminPhone,
    }),
    [adminPhone, bannerText]
  );

  return (
    <AppDetailContext.Provider value={value}>
      <div className="relative z-40">
        <div className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-blue-600 text-white border-b border-white/10">
          <div className="marquee" ref={marqueeContainerRef}>
            <span className="fixed left-[-9999px] top-0 opacity-0 pointer-events-none whitespace-nowrap px-6 py-2 pr-20 text-sm sm:text-base font-semibold tracking-wide">
              <span ref={marqueeBaseMeasureRef}>{defaultBannerText}</span>
            </span>
            <div
              className="marquee__track"
              style={{
                ...(Number.isFinite(marqueeDurationSeconds) && marqueeDurationSeconds > 0
                  ? {
                      ["--marquee-duration" as never]: `${marqueeDurationSeconds}s`,
                    }
                  : {}),
                ...(marqueeDistancePx > 0
                  ? { ["--marquee-distance" as never]: `${marqueeDistancePx}px` }
                  : {}),
              }}
            >
              {Array.from({ length: marqueeRepeatCount }).map((_, index) =>
                index === 0 ? (
                  <span
                    key={index}
                    ref={marqueeMeasureRef}
                    className="marquee__item px-6 py-2 pr-20 text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap"
                  >
                    {marqueeText}
                  </span>
                ) : (
                  <span
                    key={index}
                    aria-hidden="true"
                    className="marquee__item px-6 py-2 pr-20 text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap"
                  >
                    {marqueeText}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {children}
    </AppDetailContext.Provider>
  );
}

export function useAppDetail() {
  return useContext(AppDetailContext);
}
