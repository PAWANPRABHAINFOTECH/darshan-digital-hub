import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { languages, translate, type LangCode, type TranslationKey } from "./translations";

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: TranslationKey) => string;
  /** Booking + payment + receipt surfaces are limited to hi | en */
  bookingLang: "hi" | "en";
  setBookingLang: (l: "hi" | "en") => void;
  bt: (key: TranslationKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);
const LANG_KEY = "dps_language";
const BOOKING_KEY = "booking_language";
const codes = languages.map((l) => l.code) as string[];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("hi");
  const [bookingLang, setBookingLangState] = useState<"hi" | "en">("hi");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && codes.includes(stored)) setLangState(stored as LangCode);
    const b = localStorage.getItem(BOOKING_KEY);
    if (b === "hi" || b === "en") setBookingLangState(b);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  const setBookingLang = useCallback((l: "hi" | "en") => {
    setBookingLangState(l);
    localStorage.setItem(BOOKING_KEY, l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => translate(lang, key),
      bookingLang,
      setBookingLang,
      bt: (key) => translate(bookingLang, key),
    }),
    [lang, setLang, bookingLang, setBookingLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
