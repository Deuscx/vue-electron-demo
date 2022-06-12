interface API {
  ipcSend(eventName: string, ...args: any[]): void;
  ipcOn(eventName: string, listener: (...args: any[]) => void): void;
  ipcRemoveListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): void;
  ipcInvoke(eventName: string, ...args: any[]): Promise<boolean>;
}


interface Window {
  api: API;
}
