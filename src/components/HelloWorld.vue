<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useDevicesList, useUserMedia } from "@vueuse/core";
import { EIPCEventName, isElectron } from "@/constants";
const currentCamera = ref<string>();
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});
const video = ref<HTMLVideoElement>();
const { stream, enabled } = useUserMedia({
  videoDeviceId: currentCamera,
});
watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!;
});

const openAtLogin = ref(false);
async function getLoginItems() {
  const isLogin = await window.api.ipcInvoke(EIPCEventName.GET_LOGIN_ITEMS);
  openAtLogin.value = isLogin;
}

function handleOpenAtLogin() {
  window.api.ipcSend(EIPCEventName.SET_LOGIN_ITEMS, {
    openAtLogin: !openAtLogin.value,
  });
  openAtLogin.value = !openAtLogin.value
}
if (isElectron) {
  getLoginItems();
}
</script>

<template>
  <div v-if="isElectron">
    <input type="checkbox"
           :modelValue="openAtLogin"
           @click="handleOpenAtLogin" />开机自启动
  </div>
  <div class="flex flex-col gap-4 text-center">
    <div>
      <button @click="enabled = !enabled">
        {{ enabled ? 'Stop' : 'Start' }}
      </button>
    </div>

    <div>
      <div v-for="camera of cameras"
           :key="camera.deviceId"
           class="px-2 py-1 cursor-pointer text-blue"
           :class="{ 'text-red': currentCamera === camera.deviceId }"
           @click="currentCamera = camera.deviceId">
        {{ camera.label }}
      </div>
    </div>
    <div>
      <video ref="video"
             muted
             autoplay
             controls
             class="h-100 w-auto" />
    </div>
  </div>
</template>