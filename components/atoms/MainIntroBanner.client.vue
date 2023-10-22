<template>
  <div class="main-intro flex flex-justify-center">
    <el-text
      class="main-title"
      :class="{'activate': mainTitleTrigger}"
    >
      {{ locale === 'ko' ? mainTitle.textTitle.textKo : mainTitle.textTitle.textEn }}
    </el-text>
    <div
      class="main-text-group flex flex-column"
      :class="{'activate': mainTextTrigger}"
    >
      <el-text
        v-for="item in mainText"
        :key="item.index"
        class="text"
      >
        {{ locale === 'ko' ? item.textTitle.textKo : item.textTitle.textEn }}
      </el-text>
    </div>
    <el-text
      ref="scrollDown"
      class="scroll-down"
      :class="{'activate': scrollDownTrigger}"
    >
      {{ locale === 'ko' ? mainScrollText.textTitle.textKo : mainScrollText.textTitle.textEn }}
    </el-text>
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
    mainScrollText: SerializeObject,
    mainTitleTrigger?: boolean,
    mainTextTrigger?: boolean,
    scrollDownTrigger?: boolean
  }>(),
  {
    mainTitleTrigger: false,
    mainTextTrigger: false,
    scrollDownTrigger: false
  }
)

</script>
