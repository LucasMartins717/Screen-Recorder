import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Directory context
contextBridge.exposeInMainWorld('directoryAPI', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  getDefaultDirectory: () => ipcRenderer.invoke('get-default-video-directory'),
});

// Hotkeys context
contextBridge.exposeInMainWorld('hotkeyAPI', {
  startListeningHotkey: (action: string) => ipcRenderer.send('start-listening-hotkey', action),
  updateHotkey: (action: string, combination: string) => ipcRenderer.send('update-hotkey', action, combination),
  onHotkeyChange: (callback: (action: string, combination: string) => void) => {
    ipcRenderer.on('hotkey-changed', (_event, action, combination) => callback(action, combination));
  }
});

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
