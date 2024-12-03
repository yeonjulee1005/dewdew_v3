<template>
  <div class="h-full flex items-center justify-center">
    <nuxt-link
      :to="`https://api.instagram.com/oauth/authorize?client_id=${instagramId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`"
      external
      target="_blank"
    >
      어썸! 나인
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
// const { t } = useLocale()
const { path } = useRoute()

const instagramId = '780206030572243'
const redirectUri = 'https://localhost:4500/projects/awesomeNine'

useHead({
  // title: t('pageTitle.colorsTranslate'),
  meta: [
    // { property: 'description', content: t('openGraph.colorsTranslate') },
    // { property: 'og:title', content: t('pageTitle.colorsTranslate') },
    // { property: 'og:description', content: t('openGraph.colorsTranslate') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
  ],
})

// const code = 'AQCli081wiTWbGJDdGB4134T5fvXEHaAqFf_fbmynHClSjK_4BdPpxIiVqEpjEYjygynzraovZ-itxgrQmnzrMU2xbhzGbXPwmVA6PF8SYEn0NZdO3_6i9fkW26DIJKcEZliXgpS-KKUGoD9XWt2ut3Ns5hgqxS6rJisrLxQABe9kTp8LCcHKxzwzzFPVCoryeRQgOEpdDnmWNdL6m5NgcGy5QytaiM8HymZW6qHsm6ogA'

// console.log(code)

// const form = new FormData()
// form.append('client_id', instagramId)
// form.append('client_secret', '1c542e940afe4f3c74284a7182179fec')
// form.append('grant_type', 'authorization_code')
// form.append('redirect_uri', redirectUri)
// form.append('code', code)

// const { data } = await useFetch('https://api.instagram.com/oauth/authorize', {
//   method: 'POST',
//   body: form
// })

// console.log(data)
</script>
