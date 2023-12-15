<template>
  <ADialog
    :dialog-trigger="leaveDialogTrigger"
    hide-double-button
    @close-dialog="closeLeaveDialog"
  >
    <div class="leave-dialog flex flex-column flex-justify-center flex-align-center gap-10">
      <span class="leave-texts">
        {{ $t('messages.leavePage') }}
      </span>
      <span class="leave-texts">
        {{ $t('messages.leavePageDesc') }}
      </span>
      <AProgressBar
        :max-size="60"
        :count="count"
        custom-class="mt-20"
        :use-emoji="false"
      />
    </div>
  </ADialog>
</template>

<script setup lang="ts">

const { idle } = useIdle(10 * 60 * 1000)

let countInterval: ReturnType<typeof setInterval> | null = null

const count = ref(60)

const idleTrigger = computed(() => { return idle.value })
const leaveDialogTrigger = ref(false)

watch(() => idleTrigger.value, () => {
  if (idleTrigger.value) {
    leaveDialogTrigger.value = true
    generateCountInterval(0, 1000, countDisplay)
  } else if (countInterval !== null) {
    clearInterval(countInterval)
  }
}, { immediate: true }
)

const generateCountInterval = (count: number, delay: number, callback: (countDown: number, count: number) => void): void => {
  let countDown = 60

  countInterval = setInterval(() => {
    callback(countDown, count)
    if (countDown-- === count || !leaveDialogTrigger.value) {
      if (countInterval !== null) {
        clearInterval(countInterval)
      }
    }
  }, delay)
}

const countDisplay = (index: number, _count: number): void => {
  if (!index) {
    closeLeaveDialog()
    window.close()
  }
  count.value = index
}

const closeLeaveDialog = () => {
  leaveDialogTrigger.value = false
}

</script>
