<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    class="archive-dialog"
    dialog-title-class="archive-dialog-title"
    :title="$t('texts.archives')"
    full-screen
    hide-double-button
    @close-dialog="() => $emit('close:dialog')"
  >
    <div class="archive-image flex w-full justify-center">
      <nuxt-img
        :src="selectImageData?.url"
        format="webp"
        fit="cover"
        :alt="selectImageData?.title"
        :draggable="false"
        @contextmenu.prevent
        @click="() => $emit('close:dialog')"
      />
    </div>
  </ADialog>
</template>

<script setup lang="ts">
defineProps<{
  selectImageData: SerializeObject
}>()

const dialogTrigger = defineModel('dialogTrigger', {
  type: Boolean,
  default: false,
})

defineEmits([
  'close:dialog',
])
</script>
