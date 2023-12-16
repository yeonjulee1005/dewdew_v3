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
const { notify } = useAlarm()

const { adminAccess } = storeToRefs(useTechStore())

const { logout } = useFetchComposable()

definePageMeta({
  layout: 'login'
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

  notify('', data.value.admin ? 'success' : 'warning', data.value.admin ? t('messages.welcome') : t('messages.notAdmin'), true, 3000, 0)
  navigateTo(data.value.admin ? '/tech' : '/')
}

watch(() => user.value, () => {
  if (user.value) {
    setUserCoreData(user.value?.id)
  }
}, { immediate: true })

</script>
