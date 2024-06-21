<template>
  <div>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="pwa-toast"
      role="alert"
    >
      <div class="message">
        <span v-if="$pwa.offlineReady">
          {{ $t('pwa.readyPwa') }}
        </span>
        <span v-else>
          {{ $t('pwa.newContent') }}
        </span>
      </div>
      <div class="flex gap-4">
        <AButton
          v-if="$pwa.needRefresh"
          :button-text="$t('pwa.reload')"
          @click:button="$pwa.updateServiceWorker()"
        />
        <AButton
          :button-text="$t('pwa.close')"
          @click:button="$pwa.cancelPrompt()"
        />
      </div>
    </div>
    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="pwa-toast flex gap-4"
      role="alert"
    >
      <div class="flex flex-column items-center">
        <span class="message">
          {{ $t('pwa.installPwa') }}
        </span>
        <div class="flex gap-4">
          <AButton
            :button-text="$t('pwa.install')"
            @click:button="$pwa.install()"
          />
          <AButton
            :button-text="$t('pwa.cancel')"
            @click:button="$pwa.cancelInstall()"
          />
        </div>
      </div>
      <Icon
        :width="60"
        :height="60"
        name="ic:round-install-desktop"
      />
    </div>
  </div>
</template>
