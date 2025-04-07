import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    directoryAPI: {
      selectDirectory: () => Promise<string | null>;
      getDefaultDirectory: () => Promise<string>;
    };
    hotkeyAPI: {
      startListeningHotkey: (action: string) => void;
      updateHotkey: (action: string, combination: string) => void;
      onHotkeyChange: (callback: (action: string, combination: string) => void) => void;
    };
  }
}
