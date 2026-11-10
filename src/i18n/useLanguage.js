import { useContext } from "react";
import { LanguageContext } from "./languageContextObject";

export const useLanguage = () => useContext(LanguageContext);
