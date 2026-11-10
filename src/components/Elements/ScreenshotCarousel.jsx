import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n";

import shot1 from "../../assets/screenshots/shot-1.webp";
import shot2 from "../../assets/screenshots/shot-2.webp";
import shot3 from "../../assets/screenshots/shot-3.webp";
import shot4 from "../../assets/screenshots/shot-4.webp";
import shot5 from "../../assets/screenshots/shot-5.webp";
import shot6 from "../../assets/screenshots/shot-6.webp";
import shot7 from "../../assets/screenshots/shot-7.webp";

const SLIDES = [shot1, shot2, shot3, shot4, shot5, shot6, shot7];
const AUTOPLAY_MS = 4000;
const SWIPE_PX = 40;

export const ScreenshotCarousel = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  // Auto-play (pauses on hover / focus / touch)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function onTouchEnd(e) {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > SWIPE_PX) prev();
      else if (dx < -SWIPE_PX) next();
    }
    touchStartX.current = null;
    setPaused(false);
  }
  function onKeyDown(e) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg bg-gray-900 aspect-[1262/909]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={t(`carousel.alt${i + 1}`)}
              className="w-full h-full flex-shrink-0 object-cover object-top"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              aria-hidden={i !== index}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label={t("carousel.prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={t("carousel.next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t("carousel.goTo", { n: i + 1 })}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-red-600" : "w-2.5 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
