<template>
  <div
    class="main-contact flex flex-column flex-align-center"
    :class="{'activate': contactTrigger}"
  >
    <div class="contact-title mb-40">
      {{ $t('main.contact') }}
    </div>
    <div class="contact-lists flex flex-row flex-space-between">
      <div class="kakaotalk flex flex-column flex-align-center flex-space-between">
        <div class="title mt-default mb-default">
          {{ $t('main.kakao') }}
        </div>
        <nuxt-link
          :to="'https://open.kakao.com/o/subhorMe'"
          class="image-group flex flex-column flex-align-center"
          :external="true"
          target="_blank"
        >
          <nuxt-img
            class="mt-default mb-20"
            :src="url('kakao_medium.webp', 'assets', 'logo')"
            width="100"
            height="100"
            format="webp"
            loading="lazy"
            :alt="$t('main.kakao')"
          />
          <div class="desc mt-default mb-default">
            {{ $t('main.contactKakao') }}
          </div>
        </nuxt-link>
        <div />
      </div>
      <MainEmailContact
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

withDefaults(
  defineProps<{
    contactTrigger?: boolean
  }>(),
  {
    contactTrigger: false
  }
)

</script>
