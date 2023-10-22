<template>
  <div class="footer flex flex-column flex-justify-center flex-align-center gap-16">
    <div class="footer-menu-container flex flex-justify-center">
      <nuxt-link
        v-for="menu in mainMenuData"
        :key="menu.title"
        class="footer-links"
        :to="menu.url"
      >
        {{ menu.title }}
      </nuxt-link>
    </div>
    <div class="footer-sns-container flex flex-justify-center">
      <nuxt-link
        v-for="image in socialMenuData"
        :key="image.title"
        class="sns-links flex flex-justify-center"
        :to="image.url"
        target="_blank"
      >
        <nuxt-img
          :src="image.imageUrl"
          width="50"
          height="50"
          format="webp"
          loading="lazy"
          :alt="image.title"
        />
      </nuxt-link>
    </div>
    <div class="footer-information flex flex-column">
      <el-text>
        {{ $t('texts.copyright') }}
      </el-text>
      <el-text>
        {{ $t('texts.designed') }}
      </el-text>
      <el-text>
        {{ $t('texts.version', { version: config.public.serviceVersion.replaceAll('"', '') }) }}
      </el-text>
    </div>
  </div>
</template>

<script setup type="ts">

const config = useRuntimeConfig()

const { mainMenuData, socialMenuData } = useMenuStore()

defineProps({
  coreData: { type: Object, default: () => null }
})

</script>
