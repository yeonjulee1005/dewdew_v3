<template>
  <client-only>
    <el-dialog
      :model-value="dialogTrigger"
      :show-close="false"
      :align-center="alignCenter"
      :draggable="draggable"
      :class="customClass"
      :top="top"
      :width="width"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      close-on-click-modal
      close-on-press-escape
      destroy-on-close
      :center="center"
      :fullscreen="fullScreen"
      @close="emits('close-dialog', false)"
    >
      <template #header="{ close, titleId, titleClass}">
        <div
          v-if="!hideHeaderTrigger"
          class="custom-header flex flex-row flex-align-center flex-space-between ml-20"
        >
          <p
            :id="titleId"
            :class="titleClass"
          >
            {{ title }}
          </p>
          <Icon
            v-if="!hideCloseButton"
            style="cursor: pointer;"
            :width="30"
            :height="30"
            name="ep:close-bold"
            @click="close"
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
            :custom-class="`A-double-first-button ${activeFirstButton ? 'activate-first-button' : ''}`"
            :button-disabled="activeFirstButton"
            button-size="lg"
            :button-text="doubleFirstText"
            @click:button="emits('click-first-button')"
          />
          <AButton
            v-if="!hideSecondButton"
            custom-class="A-double-second-button"
            button-size="lg"
            :button-text="doubleSecondText"
            @click:button="emits('click-second-button')"
          />
        </div>
        <AButton
          v-if="!hideSingleButton"
          custom-class="A-single-button"
          button-variant="soft"
          button-size="lg"
          :button-text="singleText"
          @click:button="emits('click-single-button')"
        />
      </template>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    dialogTrigger?: boolean,
    visible?: boolean,
    draggable?: boolean,
    alignCenter?: boolean,
    center?: boolean,
    fullScreen?: boolean,
    customClass?: string,
    top?: string,
    width?: string,
    openDelay?: number,
    closeDelay?: number,
    hideHeaderTrigger?: boolean,
    hideCloseButton?: boolean,
    hideDoubleButton?: boolean,
    hideFirstButton?: boolean,
    hideSecondButton?: boolean,
    hideSingleButton?: boolean,
    activeFirstButton?: boolean,
    doubleFirstText?: string,
    doubleSecondText?: string,
    singleText?: string,
    title?: string
  }>(),
  {
    dialogTrigger: false,
    visible: true,
    draggable: true,
    alignCenter: true,
    center: true,
    fullScreen: false,
    customClass: '',
    top: '10dvh',
    width: '90dvw',
    openDelay: 350,
    closeDelay: 200,
    hideHeaderTrigger: false,
    hideCloseButton: false,
    hideDoubleButton: false,
    hideFirstButton: false,
    hideSecondButton: false,
    hideSingleButton: false,
    activeFirstButton: false,
    doubleFirstText: '',
    doubleSecondText: '',
    singleText: '',
    title: ''
  }
)

const emits = defineEmits([
  'close-dialog',
  'click-first-button',
  'click-second-button',
  'click-single-button'
])

</script>
