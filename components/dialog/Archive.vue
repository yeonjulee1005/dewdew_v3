<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('texts.archives')"
    hide-double-button
    @close-dialog="() => $emit('close:dialog')"
  >
    <nuxt-picture
      :src="selectImageData?.url"
      format="webp"
      fit="cover"
      :img-attrs="{style: 'width: 100%'}"
      :alt="selectImageData?.title"
      :draggable="false"
      @contextmenu.prevent
    />
  </ADialog>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    selectImageData: SerializeObject
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
