<template>
  <DDCard class="tech-card mt-6 mb-4">
    <template #header>
      <div class="card-title flex flex-row flex-align-center gap-8">
        <span class="title">
          {{ cardItem.title }}
        </span>
      </div>
      <TechAddOn
        add-on-class="tech-add-on flex flex-wrap flex-align-center flex-justify-end gap-2 mt-8"
        :article-id="cardItem.id"
        :data="cardItem"
        use-nuxt-time
        badge-size="xs"
        :estimate-read-time="estimateReadingTime(cardItem.desc)"
      />
    </template>
    <div class="desc">
      {{ cardItem.raw_article }}
    </div>
  </DDCard>
</template>

<script setup lang="ts">

const { estimateReadingTime } = useUi()

defineProps<{
  cardItem: SerializeObject
}>()

</script>
