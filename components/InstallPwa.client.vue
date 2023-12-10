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
      <el-button
        v-if="$pwa.needRefresh"
        @click="$pwa.updateServiceWorker()"
      >
        {{ $t('pwa.reload') }}
      </el-button>
      <el-button @click="$pwa.cancelPrompt()">
        {{ $t('pwa.close') }}
      </el-button>
    </div>
    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="pwa-toast flex"
      role="alert"
    >
      <div class="flex flex-column flex-align-center">
        <div class="message">
          <span>
            {{ $t('pwa.installPwa') }}
          </span>
        </div>
        <div>
          <el-button @click="$pwa.install()">
            {{ $t('pwa.install') }}
          </el-button>
          <el-button @click="$pwa.cancelInstall()">
            {{ $t('pwa.cancel') }}
          </el-button>
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
