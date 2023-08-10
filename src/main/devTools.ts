import { optimizer } from '@electron-toolkit/utils'
import { session } from 'electron'
import path from 'path'

export default (window): void => {
  // 挂载本地 vue-devtools
  const vueDevToolsPath = path.join(__dirname, '../../vue-devtools/6.5.0')
  session.defaultSession.loadExtension(vueDevToolsPath)

  // F12 打开 devTools
  //   optimizer.watchWindowShortcuts(window)
}
