export type Language = "zh" | "en"

const LANG_KEY = "preferred-language"

function detectLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANG_KEY) as Language | null
    if (stored === "zh" || stored === "en") return stored
    const lang = navigator.language || navigator.languages?.[0] || "en"
    return lang.startsWith("zh") ? "zh" : "en"
  } catch {
    return "en"
  }
}

export const languageAtom = atom<Language>(detectLanguage())

export function useLanguage() {
  const [language, setLanguage] = useAtom(languageAtom)
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "zh" ? "en" : "zh"
      localStorage.setItem(LANG_KEY, next)
      return next
    })
  }, [setLanguage])
  return { language, toggleLanguage, isZh: language === "zh" }
}
