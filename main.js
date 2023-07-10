const { app, BrowserWindow, ipcMain, Menu } = require('electron') // importing 3 modules from electron
const path = require('path')

// app handles the lifecycle of the application
// BrowserWindow creates and manages app windows.

const template = [
  // File menu
  {
    label: 'File',
    submenu: [
      {
        label: 'New', // label for the section of the submenu
        accelerator: 'Ctrl+N', // key shortcut
        click: () => {
          // Perform new file action
        },
      },
      {
        label: 'Open',
        accelerator: 'Ctrl+O',
        click: () => {

        },
      },
      {
        type: 'separator', // seperates the labels in the same submenu.
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S',
        click: () => {

        },
      },
      {
        label: 'Save As',
        accelerator: 'Shift+Ctrl+S',
        click: () => {

        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Exit',
        accelerator: 'Alt+F4',
        click: () => {
          app.quit();
        },
      },
    ],
  },
    // Personalized menu
  {
    label: "Contact Ryan",
    submenu: [
      {
        label: 'LinkedIn',
        click: async () => {
          const { shell } = require('electron'); // allows for the execution of shell commands
          await shell.openExternal('https://linkedin.com/in/ryansmithdeveloper'); // will open a tab in current/default browser to my linkedin.
        },
      },
      {
        label: 'GitHub',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://github.com/ryansmith122000'); // will open a tab in current/default browser to my github.
        },
      },
      {
        label: 'Email',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('mailto:ryansmith12.2000@gmail.com'); // will open default mailing app and opens a draft with my email as the receip.
        },
      },
    ],
  },
  // View menu
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  // Help menu
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://electronjs.org');
        },
      },
    ],
  },
];

const createWindow = () => {
  const win = new BrowserWindow({ // creates a new browser window with the following settings:
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // allows for a preload-script to execute before the window is opened.
      nodeIntegration: true, // integrating node.js
    },

  })
  win.loadFile('index.html') // will load the html to display all the content.

  const menu = Menu.buildFromTemplate(template); // building menu from the template i created
  Menu.setApplicationMenu(menu); // sets/loads the custom menu.
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
  if (process.platform !== 'darwin') { // checks to see if the platform is not macOS, if it's not, then it quits. (mac processes are different.)
    app.quit()
  }
})