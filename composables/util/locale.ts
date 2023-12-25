export const useLocale = () => {
  const { t, tm, rt, locale, setLocale } = useI18n()
  return { t, tm, rt, locale, setLocale }
}
