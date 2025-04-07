import { app, shell, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs';

let mainWindow: BrowserWindow | null;
let tray: Tray | null;
let forceQuit: boolean = false;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    type: process.platform === 'linux' ? 'toolbar' : 'utility',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  //--------------------------------------------------------------------------------//
  let hotkeys: { [key: string]: string } = {
    startReplay: 'Alt+F9',
    saveReplay: 'Alt+F10',
    startRecording: 'Alt+F11',
  };

  ipcMain.on('update-hotkey', (_event, action: string, combination: string) => {

    if (!combination || combination.split('+').length < 2) {
      return;
    }

    const oldCombination = hotkeys[action];
    if (oldCombination && globalShortcut.isRegistered(oldCombination)) {
      globalShortcut.unregister(oldCombination);
    }

    hotkeys[action] = combination;
    try {
      const registered = globalShortcut.register(combination, () => {
        if (action === 'startReplay') {
          mainWindow?.webContents.send('trigger-start-replay');
        } else if (action === 'saveReplay') {
          mainWindow?.webContents.send('trigger-save-replay');
        } else if (action === 'startRecording') {
          mainWindow?.webContents.send('trigger-start-recording');
        }
      });

      if (!registered) {
        hotkeys[action] = oldCombination;
      } else {
        mainWindow?.webContents.send('hotkey-changed', action, combination);
      }
    } catch (error) {
      hotkeys[action] = oldCombination;
    }
  });
  //--------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------//
  const ensureTempFolder = (directory: string) => {
    const tempFolder = join(directory, 'temp');
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }
    return tempFolder;
  }

  ipcMain.handle('select-directory', async () => {
    const window = BrowserWindow.getFocusedWindow();
    const result = await dialog.showOpenDialog(window!, {
      properties: ['openDirectory'],
    });
    if (result.canceled) return null;

    const selectedDir = result.filePaths[0];
    ensureTempFolder(selectedDir);
    return selectedDir;

  })
  ipcMain.handle('get-default-video-directory', () => {
    ensureTempFolder(app.getPath('videos'));
    return app.getPath('videos');
  })
  //--------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------//
  ipcMain.on('close-window', () => {
    mainWindow?.close();
  })
  //--------------------------------------------------------------------------------//

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('close', (event) => {
    if (!forceQuit) {
      event.preventDefault();
      mainWindow?.hide();
    }
  })
}

function createTray() {
  tray = new Tray(join(__dirname, '../../resources/icon.png'));

  const contextMenu: Menu = Menu.buildFromTemplate([
    { label: 'Open Overlay', click: () => mainWindow?.show() },
    { label: 'Exit', click: () => { forceQuit = true; app.quit() } }
  ])

  tray.setToolTip('Screen-Recorder');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow?.show();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow();
  createTray();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
})