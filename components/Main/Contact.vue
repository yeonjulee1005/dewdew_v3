<template>
  <div
    class="main-contact flex flex-column flex-align-center"
    :class="{'activate': contactTrigger}"
  >
    <div class="contact-title mb-40">
      {{ $t('main.contact') }}
    </div>
    <div class="contact-lists flex flex-row flex-space-between">
      <div class="social flex flex-column flex-align-center flex-space-between gap-4">
        <div class="title mt-default mb-default">
          {{ $t('main.social') }}
        </div>
        <AButton
          custom-class="kakao-button"
          button-size="xl"
          button-variant="soft"
          use-leading
          :image-src="url('kakao_medium.webp', 'assets', 'logo')"
          :button-text="'https://open.kakao.com/o/subhorMe'.split('https://')[1]"
          @click:button="navigateTo('https://open.kakao.com/o/subhorMe', { external: true, open: { target: '_blank' } })"
        />
        <AButton
          v-if="socialMenuData"
          custom-class="linkedin-button"
          button-size="xl"
          button-variant="soft"
          use-leading
          :icon-name="`line-md:${socialMenuData[1].icon}`"
          :icon-size="28"
          :button-text="socialMenuData[1].url.split('https://www.')[1]"
          @click:button="navigateTo(socialMenuData[1].url, { external: true, open: { target: '_blank' } })"
        />
        <AButton
          v-if="socialMenuData"
          custom-class="instagram-button"
          button-size="xl"
          button-variant="soft"
          use-leading
          :icon-name="`line-md:${socialMenuData[2].icon}`"
          :icon-size="28"
          :button-text="socialMenuData[2].url.split('https://www.')[1]"
          @click:button="navigateTo(socialMenuData[2].url, { external: true, open: { target: '_blank' } })"
        />
        <div />
      </div>
      <MainContactEmail
        :form-title="$t('main.email')"
        :email-key="config.public.emailJsKey"
        :email-template="config.public.emailJSsTemplate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const { url } = useImageStorage()

const { socialMenuData } = storeToRefs(useMenuStore())

withDefaults(
  defineProps<{
    contactTrigger?: boolean
  }>(),
  {
    contactTrigger: false
  }
)

</script>
