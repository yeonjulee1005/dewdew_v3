<template>
  <div class="button-group flex justify-end gap-16 mb-20">
    <AButton
      v-if="!editTrigger"
      button-class="edit-blog"
      button-size="lg"
      :button-text="$t('texts.edit')"
      @click:button="() => $emit('check:admin')"
    />
    <AButton
      v-if="editTrigger"
      button-class="write-tech-blog"
      button-size="lg"
      :button-text="$t('texts.save')"
      @click:button="() => $emit('update:article')"
    />
    <AButton
      v-if="editTrigger"
      button-class="write-tech-blog"
      button-size="lg"
      :button-text="$t('texts.cancel')"
      @click:button="() => $emit('edit:cancel')"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    editTrigger?: boolean
  }>(),
  {
    editTrigger: false,
  },
)

defineEmits([
  'check:admin',
  'update:article',
  'edit:cancel',
])
</script>
