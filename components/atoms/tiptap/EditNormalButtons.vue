<template>
  <client-only>
    <el-tooltip
      :visible="visible"
      effect="dark"
      placement="bottom"
      :content="tooltipText"
    >
      <el-button
        class="menu-item"
        :class="{'is-active': isActive}"
        @mouseenter="!tooltipTrigger ? visible = false : visible = true"
        @mouseleave="visible = false"
        @click="clickAction"
      >
        <Icon :name="iconType" />
      </el-button>
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    iconType: string,
    isActive?: boolean,
    action: Function,
    tooltipTrigger?: boolean,
    tooltipText?: string
  }>(),
  {
    isActive: false,
    tooltipTrigger: true,
    tooltipText: ''
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
