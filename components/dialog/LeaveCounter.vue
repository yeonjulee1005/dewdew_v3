<template>
  <LazyADialog
    :dialog-trigger="leaveDialogTrigger"
    hide-header-trigger
    hide-double-button
    hide-single-button
    top="30vh"
    width="300px"
    @close-dialog="closeLeaveDialog"
  >
    <div class="leave-dialog flex flex-column flex-justify-center flex-align-center gap-10">
      <el-text class="leave-texts">
        {{ $t('messages.leavePage') }}
      </el-text>
      <el-text class="leave-texts">
        {{ $t('messages.leavePageDesc') }}
      </el-text>
      <el-progress
        type="dashboard"
        class="mt-20"
        :stroke-width="20"
        :percentage="displayCount(count)"
        :color="leaveColorData"
        alt="leave"
      >
        <template #default>
          <span class="percentage-value">{{ count + ' S' }}</span>
        </template>
      </el-progress>
    </div>
  </LazyADialog>
</template>

<script setup lang="ts">

const { leaveColorData } = useLeaveColorStore()

const props = withDefaults(
  defineProps<{
    idleTrigger?: boolean
  }>(),
  {
    idleTrigger: false
  }
)

const emits = defineEmits([
  'dialog-close'
])

const leaveDialogTrigger = ref(false)
const count = ref(60)

onUpdated(() => {
  leaveDialogTrigger.value = props.idleTrigger
})

watch(leaveDialogTrigger, () => {
  if (leaveDialogTrigger.value) {
    generateCountInterval(0, 1000, countDisplay)
  }
})

const generateCountInterval = (count: number, delay: number, callback: (countDown: number, count: number) => void): void => {
  let countDown = 60
  const countInterval = setInterval(() => {
    callback(countDown, count)
    if (countDown-- === count || !leaveDialogTrigger.value) {
      clearInterval(countInterval)
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

const displayCount = (value:number) => {
  return ((value / 60) * 100)
}

const closeLeaveDialog = () => {
  leaveDialogTrigger.value = false
  emits('dialog-close', false)
}

</script>
