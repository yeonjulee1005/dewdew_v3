export const useLocale = () => {
  const { t, locale, setLocale, setLocaleCookie } = useI18n()
  return { t, locale, setLocale, setLocaleCookie }
}
