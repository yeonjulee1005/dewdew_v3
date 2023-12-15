<template>
  <DDCard class="tech-card">
    <template #header>
      <div class="card-header flex flex-row flex-align-center gap-8">
        <span class="title">
          {{ cardItem.title }}
        </span>
        <DDBadge
          color="violet"
          variant="soft"
        >
          {{ cardItem.like + ' ❤️' }}
        </DDBadge>
      </div>
    </template>
    <div class="desc">
      {{ cardItem.raw_article }}
    </div>
  </DDCard>
</template>

<script setup lang="ts">

defineProps<{
  cardItem: SerializeObject
}>()

</script>
