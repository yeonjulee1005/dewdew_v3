<template>
  <div class="article-comments">
    <span class="comments-title">
      {{ commentTitle }}
    </span>
    <el-timeline v-if="commentData.length">
      <el-timeline-item
        v-for="(comment, index) in commentData"
        :key="index"
        center
        color="#D3E3D2"
      >
        <ANuxtTime :date-time="comment.created_at" />
        <div class="comments-item flex flex-row flex-space-between flex-align-center">
          <div class="message-component mr-40">
            <span class="name">
              {{ comment.name }}
            </span>
            <div v-dompurify-html="comment.message" />
          </div>
          <AButton
            round-button
            use-icon
            icon-name="line-md:close-small"
            @click:button="openPasswordDialog(comment)"
          />
        </div>
      </el-timeline-item>
    </el-timeline>
    <el-empty
      v-else
      class="empty-comments"
      :description="emptyText"
    />
    <PasswordCheckDialog
      :title="$t('tech.password')"
      :password-dialog-trigger="passwordDialogTrigger"
      @confirm-password="(password:string) => confirmDeleteComment(password)"
      @close-dialog="() => passwordDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const { adminAccess } = storeToRefs(useTechStore())

withDefaults(
  defineProps<{
    commentTitle: string,
    commentData: SerializeObject[],
    emptyText?: string
  }>(),
  {
    emptyText: ''
  }
)

const emits = defineEmits([
  'delete:admin-comment',
  'delete:comment'
])

const selectCommentData = ref<SerializeObject>()
const passwordDialogTrigger = ref(false)

const openPasswordDialog = (commentData: SerializeObject) => {
  if (adminAccess.value) {
    emits('delete:admin-comment', commentData)
  } else {
    selectCommentData.value = commentData
    passwordDialogTrigger.value = true
  }
}

const confirmDeleteComment = (password:string) => {
  emits('delete:comment', selectCommentData.value, password)
  passwordDialogTrigger.value = false
}

</script>
