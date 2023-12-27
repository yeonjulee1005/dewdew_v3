<template>
  <DDAccordion
    class="accordion"
    :variant="accordionVariant"
    :color="accordionColor"
    :size="accordionSize"
    open-icon="i-heroicons-plus"
    close-icon="i-heroicons-minus"
    :items="accordionItems"
  >
    <template #educate="{ item }">
      <div :class="educateGroupClass">
        <Icon
          :class="educateIconClass"
          :name="educateIconName"
        />
        <p :class="educateText">
          {{ item.description }}
        </p>
      </div>
    </template>
    <template #career="{ item }">
      <div
        v-for="(text, index) in item.description"
        :key="index"
        :class="careerGroupClass"
      >
        <Icon
          :class="careerIconClass"
          :name="careerIconName"
        />
        <p :class="careerText">
          {{ text }}
        </p>
      </div>
    </template>
  </DDAccordion>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    accordionItems: AccordionItem[],
    accordionVariant?: 'solid' | 'outline' | 'ghost' | 'soft',
    accordionColor?: string,
    accordionSize?: string,
    educateGroupClass?: string,
    careerGroupClass?: string,
    educateIconClass?: string,
    careerIconClass?: string,
    educateIconName?: string,
    careerIconName?: string,
    educateText?: string,
    careerText?: string
  }>(),
  {
    accordionVariant: 'solid',
    accordionColor: 'rose',
    accordionSize: 'xl',
    educateGroupClass: 'educate-group flex flex-align-center gap-2',
    careerGroupClass: 'career-group flex flex-align-center gap-2',
    educateIconClass: 'icon',
    careerIconClass: 'icon',
    educateIconName: 'line-md:buy-me-a-coffee-twotone',
    careerIconName: 'line-md:construction-twotone',
    educateText: 'text',
    careerText: 'text'
  }
)

</script>
