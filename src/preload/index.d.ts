import { ElectronAPI } from '@electron-toolkit/preload'
import type { IpcRenderer } from 'electron'

export default interface Api {
  onUpdateCounter: (callback) => IpcRenderer
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
