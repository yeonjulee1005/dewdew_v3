<template>
  <div class="h-full flex flex-justify-center">
    <span>
      {{ $t('login.process') }}
    </span>
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { t } = useLocale()
const { notify } = useAlarm()

const { adminAccess } = storeToRefs(useTechStore())

definePageMeta({
  layout: 'login'
})

const setUserCoreData = async (userId:string) => {
  const { data, error } = await client
    .from('profiles')
    .select('admin')
    .eq('id', userId)
    .eq('deleted', false)
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  if (data.admin) {
    adminAccess.value = data.admin
    notify('', 'success', t('messages.welcome'), true, 3000, 0)
    navigateTo('/tech')
  } else {
    await client.auth.signOut()
    notify('', 'error', t('messages.notAdmin'), true, 3000, 0)
    navigateTo('/')
  }
  return data
}

watch(() => user.value, async () => {
  if (user.value) {
    await setUserCoreData(user.value?.id)
  }
}, { immediate: true })

</script>
