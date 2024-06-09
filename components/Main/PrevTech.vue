<template>
  <div
    class="main-prev-tech flex flex-column mt-20 gap-8"
    :class="{ activate: prevTechTrigger }"
  >
    <div>
      <span class="title mx-10">
        {{ $t('pageTitle.tech').split(' ')[0] }}
      </span>
    </div>
    <Flicking
      :options="option"
      :plugins="plugin"
    >
      <DDCard
        v-for="tech in techData"
        :key="tech.id"
        class="prev-card mx-5"
        :ui="{ ring: 'ring-0', rounded: 'rounded-2xl', background: 'bg-zinc-100 dark:bg-neutral-900' }"
        @click="navigateTech(tech.id)"
        @touchstart="navigateTech(tech.id)"
      >
        <span>
          {{ tech.title }}
        </span>
      </DDCard>
    </Flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'

const { loadTechData } = useFetchComposable()

const plugin = [
  new AutoPlay({
    duration: 0,
    animationDuration: 10000,
    direction: 'NEXT',
    stopOnHover: true,
  }),
]

const option = {
  movetype: 'freeScroll',
  inputType: ['touch', 'mouse'],
  circular: true,
  deceleration: 0.0035,
}

const prevTechTrigger = defineModel('prevTechTrigger', {
  type: Boolean,
  default: false,
})

const techData = await loadTechData(1, 10)

const navigateTech = (techId: string) => {
  navigateTo(`/tech/${techId}`)
}
</script>
