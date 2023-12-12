export const useLocale = () => {
  const { t, locale, setLocale } = useI18n()
  return { t, locale, setLocale }
}
