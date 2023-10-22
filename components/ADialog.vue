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
          class="custom-header flex flex-row flex-align-center flex-space-between"
        >
          <p :id="titleId" :class="titleClass">
            {{ title }}
          </p>
          <Icon
            v-if="!hideCloseButton"
            style="cursor: pointer;"
            name="ep:close-bold"
            @click="close"
          />
        </div>
      </template>
      <slot />
      <template #footer>
        <div
          v-if="!hideDoubleButton"
          class="A-dialog-double-button"
        >
          <el-button
            v-if="!hideFirstButton"
            class="A-double-first-button"
            :class="{'activate-first-button': activeFirstButton}"
            :disabled="activeFirstButton"
            size="large"
            @click="emits('click-first-button')"
          >
            {{ doubleFirstText }}
          </el-button>
          <el-button
            v-if="!hideSecondButton"
            class="A-double-second-button"
            size="large"
            @click="emits('click-second-button')"
          >
            {{ doubleSecondText }}
          </el-button>
        </div>
        <div
          v-if="!hideSingleButton"
          class="A-dialog-single-button"
        >
          <el-button
            v-if="!hideSingleButton"
            class="A-single-button"
            type="primary"
            size="large"
            @click="emits('click-single-button')"
          >
            {{ singleText }}
          </el-button>
        </div>
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
