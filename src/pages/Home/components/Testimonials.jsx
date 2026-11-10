import { useEffect, useState } from "react";
import { useLanguage, testimonials as translatedTestimonials } from "../../../i18n";

const people = [
  {
    name: "James Ploy",
    img: "https://images.unsplash.com/photo-1642060603505-e716140d45d2?auto=format&fit=crop&w=120&h=120&q=60&crop=faces",
  },
  {
    name: "Sarah Santos",
    img: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?auto=format&fit=crop&w=120&h=120&q=60&crop=faces",
  },
  {
    name: "Marco Rivera",
    img: "https://images.unsplash.com/photo-1552358155-515e264cb8b8?auto=format&fit=crop&w=120&h=120&q=60&crop=faces",
  },
  {
    name: "Lisa Talor",
    img: "https://images.unsplash.com/photo-1617309644714-89d2ab1c9e19?auto=format&fit=crop&w=120&h=120&q=60&crop=faces",
  },
];

const AUTO_ADVANCE_MS = 5000;

export const Testimonials = () => {
  const { lang, t: tr } = useLanguage();
  const texts = translatedTestimonials[lang] ?? translatedTestimonials.en;
  const testimonials = people.map((p, i) => ({ ...p, ...texts[i] }));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  function goTo(index) {
    setCurrent(((index % count) + count) % count);
  }

  return (
    <section className='my-20'>
      <h1 className="text-2xl text-center font-semibold text-orange-600 dark:text-orange-500 mb-5 underline underline-offset-8">{tr("home.testimonials")}</h1>

      <div
        className="relative max-w-2xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col justify-center items-center p-8 text-center bg-white dark:bg-gray-800 shrink-0 w-full"
              >
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.title}</h3>
                  <p className="my-4 font-light">{t.quote}</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                  <img className="w-9 h-9 rounded-full" src={t.img} alt={t.name} />
                  <div className="space-y-0.5 font-medium dark:text-white text-left">
                    <div>{t.name}</div>
                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label={tr("home.prevTestimonial")}
          className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 shadow-sm"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label={tr("home.nextTestimonial")}
          className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 shadow-sm"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={tr("home.goToTestimonial", { n: i + 1 })}
              className={`h-2.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-orange-600 dark:bg-orange-500"
                  : "w-2.5 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
