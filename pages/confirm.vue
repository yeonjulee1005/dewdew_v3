<template>
  <div class="h-full flex flex-column flex-justify-center flex-align-center gap-4">
    <Icon
      name="svg-spinners:clock"
      :width="160"
      :height="160"
    />
    <span>
      {{ $t('login.process') }}
    </span>
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { t } = useLocale()

const { adminAccess } = storeToRefs(useTechStore())
const { logout } = useFetchComposable()

const toast = useToast()

definePageMeta({
  layout: 'raw'
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

  data?.admin
    ? adminAccess.value = data.admin
    : logout()

  toast.add({
    title: data.admin ? t('messages.welcome') : t('messages.notAdmin'),
    color: data.admin ? 'orange' : 'fuchsia',
    timeout: 3000
  })
  navigateTo(data.admin ? '/tech?page=1&count=4' : '/')
}

watch(() => user.value, () => {
  if (user.value) {
    setUserCoreData(user.value?.id)
  }
}, { immediate: true })

</script>
