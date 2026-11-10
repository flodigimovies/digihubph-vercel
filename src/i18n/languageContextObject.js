import { createContext } from "react";

export const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
});
