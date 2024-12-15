const GetActiveWindow = require("./src/get-active-window")
const BrowserHistory = require("./src/get-browser-url")
const FileOperation = require("./src/file-operation");
const GetSuperseeWindowWithActiveWin = require("./src/get-suersee-windows");
class GetSuperseeWindow {
    browserLists = [
        {
            "title": "Avast Secure Browser"
        },
        {
            "title": "Yandex with voice assistant Alice"
        },
        {
            "title": "Pale Moon web browser"
        },
        {
            "title": "Waterfox"
        },
        {
            "title": "Slimjet"
        },
        {
            "title": "Falkon"
        },
        {
            "title": "Opera GX"
        },
        {
            "title": "Chromium"
        },
        {
            "title": "Epic Privacy"
        },
        {
            "title": "SeaMonkey"
        },
        {
            "title": "Midori"
        },
        {
            "title": "Netscape"
        },
        {
            "title": "Maxthon"
        },
        {
            "title": "UC Browser"
        },
        {
            "title": "Tor Browser"
        },
        {
            "title": "Vivaldi"
        },
        {
            "title": "Internet Explorer"
        },
        {
            "title": "Brave"
        },
        {
            "title": "Opera"
        },
        {
            "title": "Safari"
        },
        {
            "title": "Microsoft Edge"
        },
        {
            "title": "Firefox"
        },
        {
            "title": "Google Chrome"
        }
    ]
    fileOperation = new FileOperation();
    getActiveWindow = new GetActiveWindow();
    getSuperseeWin = new GetSuperseeWindowWithActiveWin();
    constructor() { }

    setBrowsersList(browserLists) {
        this.fileOperation.saveBrowserList(browserLists);
    }

    getBrowserList() {
        try {
            return this.fileOperation.readBrowserList();
        } catch (error) {
            console.error("Error while browser list", error);
        }
    }

    getActiveWindowWithUrl() {
        const browserList = this.getBrowserList();
        this.getActiveWindow.getActiveWindows().then((currentApplication) => {
            if (currentApplication) {
                this.getSuperseeWin.activeWindow(currentApplication, browserList).then((currentApp) => {
                    console.log("Getting current application with url", currentApp);
                    console.log("");
                    console.log("");
                    console.log("");
                    console.log("");
                    console.log("");
                    console.log("");
                }).catch((error) => {
                    console.error("Error while getting current app", error);
                });
            } else {
                console.log("Error while getting window", currentApplication)
            }
        })
    }
}

let getWindows = new GetSuperseeWindow();

// getWindows.setBrowsersList([
//     {
//         "title": "Avast Secure Browser"
//     },
//     {
//         "title": "Yandex with voice assistant Alice"
//     },
//     {
//         "title": "Pale Moon web browser"
//     },
//     {
//         "title": "Waterfox"
//     },
//     {
//         "title": "Slimjet"
//     },
//     {
//         "title": "Falkon"
//     },
//     {
//         "title": "Opera GX"
//     },
//     {
//         "title": "Chromium"
//     },
//     {
//         "title": "Epic Privacy"
//     },
//     {
//         "title": "SeaMonkey"
//     },
//     {
//         "title": "Midori"
//     },
//     {
//         "title": "Netscape"
//     },
//     {
//         "title": "Maxthon"
//     },
//     {
//         "title": "UC Browser"
//     },
//     {
//         "title": "Tor Browser"
//     },
//     {
//         "title": "Vivaldi"
//     },
//     {
//         "title": "Internet Explorer"
//     },
//     {
//         "title": "Brave"
//     },
//     {
//         "title": "Opera"
//     },
//     {
//         "title": "Safari"
//     },
//     {
//         "title": "Microsoft Edge"
//     },
//     {
//         "title": "Firefox"
//     },
//     {
//         "title": "Google Chrome"
//     }
// ]);

setInterval(() => {
    getWindows.getActiveWindowWithUrl();
}, 5000)


module.exports = GetSuperseeWindow;