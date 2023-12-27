<template>
  <div class="main-intro flex flex-justify-center">
    <span
      class="main-title"
      :class="{'activate': mainTitleTrigger}"
    >
      {{ $t('main.intro.largeTitle') }}
    </span>
    <div
      class="main-text-group flex flex-column"
      :class="{'activate': mainTextTrigger}"
    >
      <span
        v-for="(item, index) in $tm('main.intro.description')"
        :key="index"
        class="text"
      >
        {{ $rt(item) }}
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
      :draggable="false"
      @contextmenu.prevent
    />
  </div>
</template>

<script setup lang=ts>

const { url } = useImageStorage()

withDefaults(
  defineProps<{
    mainTitleTrigger?: boolean,
    mainTextTrigger?: boolean
  }>(),
  {
    mainTitleTrigger: false,
    mainTextTrigger: false
  }
)

</script>
