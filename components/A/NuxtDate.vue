<template>
  <NuxtTime
    :datetime="dateTime"
    :locale="locale"
    :class="customClass"
    :year="fullDate ? 'numeric' : '2-digit'"
    :month="fullDate ? 'long' : 'short'"
    :day="fullDate ? 'numeric' : '2-digit'"
  />
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    dateTime?: string,
    customClass?: string,
    fullDate?: boolean
  }>(),
  {
    dateTime: '',
    customClass: 'time flex',
    fullDate: true
  }
)

</script>
