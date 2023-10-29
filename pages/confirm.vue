<template>
  <div class="h-full flex flex-justify-center">
    <el-text size="large">
      {{ $t('login.process') }}
    </el-text>
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { t } = useLocale()
const { notify } = useAlarm()

const { updateAccessWrite } = useBlogStore()

definePageMeta({
  layout: 'login'
})

const setUserCoreData = async (userId:string) => {
  const { data: userData }:SerializeObject = await useAsyncData('userData', async () => {
    const { data, error } = await client.from('profiles')
      .select('*')
      .eq('id', userId)
      .eq('deleted', false)
      .single()

    if (error) {
      throw createError({ statusMessage: error.message })
    }

    return data
  })
  if (userData.value.admin) {
    updateAccessWrite(true)
    notify('', 'success', t('messages.welcome'), true, 3000, 0)
    navigateTo('/blog')
  } else {
    await client.auth.signOut()
    notify('', 'error', t('messages.notAdmin'), true, 3000, 0)
    navigateTo('/')
  }
}

watchEffect(async () => {
  if (user.value) {
    await setUserCoreData(user.value?.id)
  }
})

</script>
