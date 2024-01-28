<template>
  <DDSelectMenu
    v-model="selectLocale"
    color="orange"
    size="sm"
    variant="outline"
    :options="locales"
    value-attribute="value"
    option-attribute="label"
  >
    <template #label>
      <Icon
        :name="selectLocale === 'ko' ? 'circle-flags:kr' : 'circle-flags:us'"
        :width="24"
        :height="24"
      />
      {{ selectLocale }}
    </template>
  </DDSelectMenu>
</template>

<script setup lang="ts">

const { t, locale, setLocale } = useLocale()

const locales = [
  { label: t('localeMenu.korean'), value: 'ko' },
  { label: t('localeMenu.english'), value: 'en' }
]

const selectLocale = computed({
  get () {
    return locale.value
  },
  set (value) {
    setLocale(value)
  }
})

</script>
