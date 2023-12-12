<template>
  <client-only>
    <el-tooltip
      :visible="visible"
      effect="dark"
      placement="bottom"
      :content="text"
    >
      <el-button
        class="tiptap-text-menu-item"
        :class="{'is-active': isActive}"
        @mouseenter="!tooltipTrigger ? visible = false : visible = true"
        @mouseleave="visible = false"
        @click="clickAction"
      >
        <span :style="{ fontFamily: fontFamilyName }">
          {{ text }}
        </span>
      </el-button>
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    isActive: boolean,
    action: Function,
    fontFamilyName?: string,
    tooltipTrigger?: boolean,
    text?: string
  }>(),
  {
    tooltipTrigger: true,
    fontFamilyName: '',
    text: ''
  }
)

const emits = defineEmits([
  'select-button'
])

const visible = ref(false)

const clickAction = () => {
  props.action()
  emits('select-button')
}

</script>
