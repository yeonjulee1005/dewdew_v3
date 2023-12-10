<template>
  <LazyADialog
    :dialog-trigger="portfolioDialogTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    custom-class="portfolio-dialog"
    @close-dialog="() => $emit('close:dialog', false)"
  >
    <div class="flex flex-column gap-10">
      <el-text class="title mb-default">
        {{ selectPortfolio.title }}
      </el-text>
      <el-text class="description mb-default">
        {{ selectPortfolio.desc }}
      </el-text>
    </div>
    <nuxt-picture
      class="detail-image"
      :src="selectPortfolio.image"
      width="2000"
      height="2400"
      format="webp"
      fit="cover"
      :alt="selectPortfolio.alt"
      :img-attrs="{class: 'image'}"
      @click="navigateTo(selectPortfolio.url, { open: { target: '_blank' } })"
    />
  </LazyADialog>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    selectPortfolio: SerializeObject
    portfolioTrigger?: boolean
  }>(),
  {
    portfolioTrigger: false
  }
)

const emits = defineEmits([
  'close:dialog'
])

const portfolioDialogTrigger = computed({
  get: () => props.portfolioTrigger,
  set: (value) => {
    if (value) {
      emits('close:dialog', value)
    }
  }
})

</script>
