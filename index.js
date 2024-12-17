const GetActiveWindow = require("./src/get-active-window");
const BrowserHistory = require("./src/get-browser-url");
const FileOperation = require("./src/file-operation");
const GetSuperseeWindowWithActiveWin = require("./src/get-suersee-windows");

class GetSuperseeWindow {
    fileOperation = new FileOperation();
    getActiveWindow = new GetActiveWindow();
    getSuperseeWin = new GetSuperseeWindowWithActiveWin();

    constructor() { }

    setBrowsersList(browserLists) {
        return this.fileOperation.saveBrowserList(browserLists);
    }

    getBrowserList() {
        try {
            return this.fileOperation.readBrowserList();
        } catch (error) {
            console.error("Error reading browser list:", error.message);
            return []; // Return empty array if there is an error
        }
    }

    async getActiveWindowWithUrl() {
        try {
            const browserList = this.getBrowserList();
            const currentApplication = await this.getActiveWindow.getActiveWindows();

            if (!currentApplication) {
                console.log("No active window found.");
                return;
            }

            const currentApp = await this.getSuperseeWin.activeWindow(currentApplication, browserList);

            if (currentApp) {                
                return currentApp;
            }
            
            return { ...currentApplication, isBrowser: false }; // Mark as non-browser
        } catch (error) {
            console.error("Error retrieving active window or URL:", error.message);
        }
    }
}
module.exports = GetSuperseeWindow;
