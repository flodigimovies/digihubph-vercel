import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./languageContextObject";
import { translations } from "./translations";

const STORAGE_KEY = "lang";
const SUPPORTED = ["en", "tl", "ja"];
const HTML_LANG = { en: "en", tl: "fil", ja: "ja" };

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch { /* ignore */ }
  return "en";
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = HTML_LANG[lang] ?? "en";
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let text = translations[lang]?.[key] ?? translations.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replaceAll(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [lang]
  );

  // Cycles EN -> FIL -> JA -> EN each click.
  const toggleLang = useCallback(
    () => setLang((l) => SUPPORTED[(SUPPORTED.indexOf(l) + 1) % SUPPORTED.length]),
    []
  );

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
