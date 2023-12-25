<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('texts.portfolio')"
    hide-double-button
    @close-dialog="() => $emit('close:dialog')"
  >
    <div class="flex flex-column gap-10">
      <span class="title mb-default">
        {{ selectPortfolio.title }}
      </span>
      <span class="description mb-default">
        {{ selectPortfolio.desc }}
      </span>
    </div>
    <nuxt-picture
      class="detail-image"
      :src="selectPortfolio.image"
      width="2000"
      height="2400"
      format="webp"
      fit="cover"
      :alt="selectPortfolio.alt"
      :img-attrs="{class: 'image'}"
      @click="navigateTo(selectPortfolio.url, { open: { target: '_blank' } })"
    />
  </ADialog>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    selectPortfolio: SerializeObject
    dialogTrigger?: boolean
  }>(),
  {
    dialogTrigger: false
  }
)

defineEmits([
  'close:dialog'
])

</script>
