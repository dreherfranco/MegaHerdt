const { app, BrowserWindow } = require("electron");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        simpleFullscreen: true,
        title: "MegaHerdt Desktop",
        resizable: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
        }
    });

    appWin.loadURL('http://localhost:4200');
    //appWin.loadURL(`file://${__dirname}/dist/index.html`);
    
    appWin.setMenu(null);

    //appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});