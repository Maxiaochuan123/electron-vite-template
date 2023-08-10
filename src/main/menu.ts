import { Menu } from 'electron'
import type { BrowserWindow } from 'electron'

export default (mainWindow: BrowserWindow): void => {
  const menu = Menu.buildFromTemplate([
    {
      label: '计算',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}
