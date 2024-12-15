const BrowserHistory = require("./get-browser-url");

class GetSuperseeWindowWithActiveWin extends BrowserHistory {
    constructor() {
        super();
    }

    /**
     * 
     * @param {Object} currentApplication - Current Application object get by get-windows library. 
     * @param {Array} browserLists - All browser list by the json file.
     */
    async activeWindow(currentApplication, browserLists) {
        try {

            let currentBrowser;
            const applicationName = currentApplication.owner.name;
            if (browserLists) {
                let browseObject = browserLists.find(browser => applicationName.toLowerCase().includes(browser.title.toLowerCase()));
                if (browseObject && browseObject.title) {
                    currentBrowser = browserLists.find(browser =>
                        applicationName.toLowerCase().includes(browser.title.toLowerCase())
                    ).title;
                }
            }

            if (currentBrowser) {
                currentApplication.isBrowser = true;
                const applicationTitle = currentApplication.title;
                this.getBrowserUrl(currentBrowser, applicationTitle)
            } else {
                currentApplication.isBrowser = false;
            }

            return currentApplication;
        } catch (error) {
            console.error("Error retrieving the supersee window:", error);
            throw new Error("Failed to retrieve supersee window."); // Keep meaningful error messages
        }
    }

    /**
     * 
     * @param {String} currentBrowserName - Current matched browser name. 
     * @param {String} applicationTitle - current browser application title.
     */
    async getBrowserUrl(currentBrowserName, applicationTitle) {
        console.log("Getting browser url", currentBrowserName, applicationTitle);
        console.log("");
        console.log("");
        console.log("");
        this.getBrowserHistoryByName(currentBrowserName, applicationTitle).then((value) => {
            console.log(" ******** Current application url ******** ", value);
        })

    }
}

module.exports = GetSuperseeWindowWithActiveWin;
