<template>
  <div class="footer-information flex flex-column">
    <span>
      {{ $t('texts.copyright') }}
    </span>
    <span>
      {{ $t('texts.designed') }}
    </span>
    <span @click="() => magicLinkDialogTrigger = true">
      {{ $t('texts.version', { version: config.public.serviceVersion.replaceAll('"', '') }) }}
    </span>
    <DialogMagicLink
      v-model:dialog-trigger="magicLinkDialogTrigger"
      :title="$t('placeholder.inputEmail')"
      @submit:email="loginMagicLink"
      @close:dialog="() => magicLinkDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const magicLinkDialogTrigger = ref(false)

const getUrl = () => {
  let url = config.public.siteUrl ?? 'https://www.dewdew.dev'
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url.concat('confirm')
}

const loginMagicLink = async (email: string) => {
  const { error } = await supabase.auth
    .signInWithOtp({
      email,
      options: {
        emailRedirectTo: getUrl(),
      },
    })

  if (error) {
    throw createError({ statusMessage: error.message })
  }
}
</script>
