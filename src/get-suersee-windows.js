const BrowserHistory = require("./get-browser-url");

class GetSuperseeWindowWithActiveWin extends BrowserHistory {
    constructor() {
        super();
    }

    /**
     * Retrieves the active window's URL if it matches any browser in the list.
     * @param {Object} currentApplication - The current application object obtained from get-windows library.
     * @param {Array} browserLists - A list of browsers from the JSON file.
     * @returns {Object} - The updated current application object with a URL if it's a browser.
     */
    async activeWindow(currentApplication, browserLists) {
        try {
            const applicationName = currentApplication.owner.name.toLowerCase();
            const browser = browserLists?.find(browser => applicationName.includes(browser.title.toLowerCase()));

            if (!browser) {
                currentApplication.isBrowser = false;
                return currentApplication;
            }

            // If a matching browser is found
            currentApplication.isBrowser = true;
            const applicationTitle = currentApplication.title;
            const currentBrowserTabUrl = await this.getBrowserUrl(browser.title, applicationTitle);

            if (currentBrowserTabUrl) {
                const url = new URL(currentBrowserTabUrl);
                let browserOrigin = "";
                if (url.origin == null || url.origin == "null" || !url.origin) {
                    browserOrigin = url.href;
                } else {
                    browserOrigin = url.origin;
                } // Use origin if available, otherwise full URL
                currentApplication.url = browserOrigin;
                console.log("Current Browser Tab URL:", url);
            } else {
                currentApplication.url = "";
            }

            return currentApplication;
        } catch (error) {
            console.error("Error retrieving the supersee window:", error);
            throw new Error("Failed to retrieve supersee window.");
        }
    }

    /**
     * Retrieves the browser's URL based on its name and the application title.
     * @param {String} currentBrowserName - The name of the current matched browser.
     * @param {String} applicationTitle - The title of the current browser application.
     * @returns {String} - The URL of the current browser tab.
     */
    async getBrowserUrl(currentBrowserName, applicationTitle) {
        try {
            const history = await this.getBrowserHistoryByName(currentBrowserName, applicationTitle);
            if (history.length > 0) {
                const browserUrl = history[0].url;
                console.log("******** Current application URL ********", browserUrl);
                return browserUrl;
            }
            return "";
        } catch (error) {
            console.error("Error retrieving browser history:", error);
            return "";
        }
    }
}

module.exports = GetSuperseeWindowWithActiveWin;
