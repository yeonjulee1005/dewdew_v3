<template>
  <div class="h-full flex flex-justify-center">
    <el-text size="large">
      {{ $t('login.process') }}
    </el-text>
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { t } = useLocale()
const { notify } = useAlarm()

definePageMeta({
  layout: 'login'
})

const setUserCoreData = async (userId:string) => {
  const { data: userData }:SerializeObject = await useAsyncData('userData', async () => {
    const { data } = await useFetch('/api/profiles', {
      headers: useRequestHeaders(['cookie']),
      method: 'GET',
      query: {
        userId
      }
    })
    return data.value
  })
  if (userData.value.admin) {
    notify('', 'success', t('messages.welcome'), true, 3000, 0)
    navigateTo('/blog')
  } else {
    await supabase.auth.signOut()
    notify('', 'error', t('messages.notAdmin'), true, 3000, 0)
    navigateTo('/')
  }
}

watch(user, async () => {
  if (user.value) {
    await setUserCoreData(user.value?.id)
  }
}, { immediate: true })

</script>
