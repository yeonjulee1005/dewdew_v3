<template>
  <div class="article-comments border-t-2 border-b-2 border-orange-300 dark:border-orange-400">
    <span class="comments-title">
      {{ commentTitle }}
    </span>
    <DDCard
      v-for="(comment, index) in commentData"
      v-show="commentData.length"
      :key="index"
      class="mt-4 mb-4"
      :ui="{ ring: 'ring-2 ring-orange-300 dark:ring-orange-400', rounded: 'rounded-2xl', background: 'bg-zinc-100 dark:bg-neutral-900' }"
    >
      <div class="flex flex-row justify-between items-center">
        <div class="message-component">
          <p class="name">
            {{ comment.name }}
          </p>
          <div v-dompurify-html="comment.message" />
        </div>
        <AButton
          round-button
          use-leading
          icon-name="line-md:close-small"
          @click:button="openPasswordDialog(comment)"
        />
      </div>
    </DDCard>
    <DDSkeleton
      v-show="!commentData.length"
      class="h-[100px] mt-4 mb-4"
      :ui="{ rounded: 'rounded-fill', background: 'bg-zinc-100 dark:bg-neutral-900' }"
    />
    <DialogPasswordCheck
      v-model:dialog-trigger="passwordDialogTrigger"
      @confirm-password="(password:string) => confirmDeleteComment(password)"
      @close-dialog="() => passwordDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">
const { adminAccess } = storeToRefs(useTechStore())

defineProps<{
  commentTitle: string
  commentData: SerializeObject[]
}>()

const emits = defineEmits([
  'delete:admin-comment',
  'delete:comment',
])

const selectCommentData = ref<SerializeObject>()
const passwordDialogTrigger = ref(false)

const openPasswordDialog = (commentData: SerializeObject) => {
  if (adminAccess.value) {
    emits('delete:admin-comment', commentData)
  }
  else {
    selectCommentData.value = commentData
    passwordDialogTrigger.value = true
  }
}

const confirmDeleteComment = (password: string) => {
  emits('delete:comment', selectCommentData.value, password)
  passwordDialogTrigger.value = false
}
</script>
