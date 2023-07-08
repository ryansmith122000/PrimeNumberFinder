const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})


// purpose of this is to have code that runs before the web page is loaded into a browser window.
// access to both DOM APIs and Node.js
// electron uses the preload script ot setup inter-process communication (the ipc modules installed).