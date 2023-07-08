const { app, BrowserWindow, ipcMain } = require('electron') // importing 3 modules from electron
const path = require('path')

// app handles the lifecycle of the application
// BrowserWindow creates and manages app windows.

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => { // calls the function createWindow when the app is ready.
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => { // calls for the app to quit when the window is closed.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})