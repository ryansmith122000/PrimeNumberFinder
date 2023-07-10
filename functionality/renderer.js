const title = document.getElementById('title')
title.innerText = `Prime Number Finder | Built with (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})` // sets the title of the browser window to include chrome, node.js, and electron versions.

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out pong
}