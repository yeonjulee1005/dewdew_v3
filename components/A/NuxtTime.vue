<template>
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
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    dateTime?: string,
    customClass?: string,
    fullDateTime?: boolean
  }>(),
  {
    dateTime: '',
    customClass: 'time flex mb-default',
    fullDateTime: true
  }
)

</script>
