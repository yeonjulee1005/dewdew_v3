<template>
  <div class="main-intro flex flex-justify-center">
    <span
      class="main-title"
      :class="{'activate': mainTitleTrigger}"
    >
      {{ locale === 'ko' ? mainTitle?.textTitle.ko : mainTitle?.textTitle.en }}
    </span>
    <div
      class="main-text-group flex flex-column"
      :class="{'activate': mainTextTrigger}"
    >
      <span
        v-for="item in mainText"
        :key="item.index"
        class="text"
      >
        {{ locale === 'ko' ? item?.textTitle.ko : item?.textTitle.en }}
      </span>
    </div>
    <nuxt-picture
      :src="url('main_banner.webp', 'assets', 'banner')"
      class="main-banner"
      width="2000"
      height="1333"
      legacy-format="webp"
      fit="cover"
      alt="main-banner"
      :img-attrs="{class: 'banner'}"
    />
  </div>
</template>

<script setup lang=ts>

const { locale } = useLocale()

const { url } = useImageStorage()

withDefaults(
  defineProps<{
    mainTitle: SerializeObject,
    mainText: SerializeObject[],
    mainTitleTrigger?: boolean,
    mainTextTrigger?: boolean
  }>(),
  {
    mainTitleTrigger: false,
    mainTextTrigger: false
  }
)

</script>
