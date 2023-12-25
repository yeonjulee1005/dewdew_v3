<template>
  <client-only>
    <NuxtTime
      :datetime="dateTime"
      :locale="locale"
      :class="customClass"
      :year="fullDateTime ? 'numeric' : '2-digit'"
      :month="fullDateTime ? 'long' : 'short'"
      :day="fullDateTime ? 'numeric' : '2-digit'"
      :hour="fullDateTime ? 'numeric' : '2-digit'"
      :minute="fullDateTime ? 'numeric' : '2-digit'"
      :second="fullDateTime ? 'numeric' : '2-digit'"
    />
  </client-only>
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    dateTime: string,
    customClass?: string,
    fullDateTime?: boolean
  }>(),
  {
    customClass: 'time flex mb-default',
    fullDate: true
  }
)

</script>
