import { activeWindow } from 'get-windows';
// const activeWindow = require("get-windows");

class GetActiveWindow {
    constructor() { }

    /**
     * Retrieves the currently active windows.
     * @returns {Promise<Object>} The active window information.
     */
    async getActiveWindows() {
        try {
            const result = await activeWindow({ 'screenRecordingPermission': false });
            return result; // Returns the active window information
        } catch (error) {
            console.error("Error in getting active window:", error);
            throw new Error("Failed to retrieve active window."); // Rethrow the error to be handled by the caller
        }
    }
}

module.exports = GetActiveWindow;