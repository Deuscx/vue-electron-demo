import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  ipcSend(eventName: string, ...args: any[]) {
    return ipcRenderer.send(eventName, ...args);
  },
  ipcOn(eventName: string, listener: (...args: any[]) => void) {
    return ipcRenderer.on(eventName, listener);
  },
  ipcRemoveListener(eventName: string, listener: (...args: any[]) => void) {
    return ipcRenderer.removeListener(eventName, listener);
  },
  ipcInvoke(eventName: string, ...args: any[]) {
    return ipcRenderer.invoke(eventName, ...args);
  },
});
