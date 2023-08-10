"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/icon.png");
const createDevTools = (window) => {
  const vueDevToolsPath = path.join(__dirname, "../../vue-devtools/6.5.0");
  electron.session.defaultSession.loadExtension(vueDevToolsPath);
};
const createMenu = (mainWindow) => {
  const menu = electron.Menu.buildFromTemplate([
    {
      label: "计算",
      submenu: [
        {
          click: () => mainWindow.webContents.send("update-counter", 1),
          label: "Increment"
        },
        {
          click: () => mainWindow.webContents.send("update-counter", -1),
          label: "Decrement"
        }
      ]
    }
  ]);
  electron.Menu.setApplicationMenu(menu);
};
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    // autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  createMenu(mainWindow);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.webContents.openDevTools();
}
electron.app.on("browser-window-created", (_, window) => {
  createDevTools();
});
electron.app.whenReady().then(() => {
  createWindow();
  console.log("MAIN_VITE_AA: ", process.env.PNPM_HOME);
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
