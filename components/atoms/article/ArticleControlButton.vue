<template>
  <div class="button-group flex flex-justify-end mb-20">
    <el-button
      v-if="!editTrigger"
      class="edit-blog"
      @click="() => $emit('check:admin')"
    >
      {{ $t('texts.edit') }}
    </el-button>
    <el-button
      v-if="editTrigger"
      class="write-tech-blog"
      @click="() => $emit('update:article')"
    >
      {{ $t('texts.save') }}
    </el-button>
    <el-button
      v-if="editTrigger"
      class="write-tech-blog"
      @click="() => $emit('edit:cancel')"
    >
      {{ $t('texts.cancel') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    editTrigger?: boolean
  }>(),
  {
    editTrigger: false
  }
)

defineEmits([
  'check:admin',
  'update:article',
  'edit:cancel'
])

</script>
