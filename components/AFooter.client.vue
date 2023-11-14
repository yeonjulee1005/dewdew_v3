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
          :src="image.image_url"
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
      <el-text
        @click="() => magicLinkDialogTrigger = true"
      >
        {{ $t('texts.version', { version: config.public.serviceVersion.replaceAll('"', '') }) }}
      </el-text>
    </div>
    <MagicLinkDialog
      :visible="magicLinkDialogTrigger"
      custom-class="magic-link-dialog"
      :title="$t('dialog.magicLinkTitle')"
      :double-first-text="$t('texts.send')"
      :double-second-text="$t('texts.close')"
      @submit-email="loginMagicLink"
      @close-dialog="() => magicLinkDialogTrigger = false"
    />
  </div>
</template>

<script setup type="ts">

const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const { mainMenuData, socialMenuData } = useMenuStore()

const magicLinkDialogTrigger = ref(false)

const getUrl = () => {
  let url = config.public.siteUrl ?? 'https://www.dewdew.dev'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url.concat('confirm')
}

const loginMagicLink = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getUrl()
    }
  })
  loginNotify(error, t('messages.magicLinkSuccess.title'), t('messages.magicLinkSuccess.description'))
}

</script>
