<template>
  <DDModal
    v-model="modalTrigger"
    :fullscreen="fullScreen"
    overlay
    :prevent-close="preventClose"
  >
    <DDCard>
      <template #header>
        <div
          v-if="title"
          class="flex flex-align-center flex-space-between"
        >
          <span>
            {{ title }}
          </span>
          <AButton
            color="violet"
            button-variant="ghost"
            use-icon
            icon-name="line-md:menu-to-close-alt-transition"
            @click="modalTrigger = false"
          />
        </div>
      </template>
      <slot />
      <template #footer>
        <div
          v-if="!hideDoubleButton"
          class="A-dialog-double-button flex flex-justify-end gap-16 "
        >
          <AButton
            v-if="!hideFirstButton"
            :button-disabled="disableFirstButton"
            button-size="lg"
            :button-text="doubleFirstText"
            @click:button="emits('click-first-button')"
          />
          <AButton
            v-if="!hideSecondButton"
            button-size="lg"
            :button-text="doubleSecondText"
            @click:button="emits('click-second-button')"
          />
        </div>
      </template>
    </DDCard>
  </DDModal>
</template>

<script setup lang="ts">

const modalTrigger = ref(false)

const props = withDefaults(
  defineProps<{
    dialogTrigger?: boolean,
    fullScreen?: boolean,
    preventClose?: boolean,
    title?: string,
    doubleFirstText?: string,
    doubleSecondText?: string,
    hideDoubleButton?: boolean,
    hideFirstButton?: boolean,
    hideSecondButton?: boolean,
    disableFirstButton?: boolean
  }>(),
  {
    dialogTrigger: false,
    fullScreen: false,
    preventClose: false,
    title: '',
    doubleFirstText: '',
    doubleSecondText: '',
    hideDoubleButton: false,
    hideFirstButton: false,
    hideSecondButton: false,
    disableFirstButton: false
  }
)

const emits = defineEmits([
  'close-dialog',
  'click-first-button',
  'click-second-button'
])

watch(() => props.dialogTrigger, (value) => {
  modalTrigger.value = value
}, { immediate: true })

watch(() => modalTrigger.value, (value) => {
  if (!value) {
    emits('close-dialog')
  }
}, { immediate: true })

</script>
