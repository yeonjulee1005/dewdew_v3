<template>
  <div class="h-full flex flex-justify-center">
    <span>
      {{ $t('login.process') }}
    </span>
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()

const { t } = useLocale()

const { adminAccess } = storeToRefs(useTechStore())
const { logout } = useFetchComposable()

const toast = useToast()

definePageMeta({
  layout: 'raw'
})

const setUserCoreData = async (userId:string) => {
  const { data }: SerializeObject = await useFetch('/api/admin', {
    headers: useRequestHeaders(['cookie']),
    query: {
      userId
    },
    immediate: true
  })

  data.value.admin
    ? adminAccess.value = data.value.admin
    : logout()

  toast.add({
    title: data.value.admin ? t('messages.welcome') : t('messages.notAdmin'),
    color: data.value.admin ? 'rose' : 'fuchsia',
    timeout: 3000
  })
  navigateTo(data.value.admin ? '/tech' : '/')
}

watch(() => user.value, () => {
  if (user.value) {
    setUserCoreData(user.value?.id)
  }
}, { immediate: true })

</script>
