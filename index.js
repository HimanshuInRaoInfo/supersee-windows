'use strict';
const BrowserHistory = require("./src/get-browser-url");
const browserHistory = new BrowserHistory();

const GetActiveWindow = require("./src/get-active-window");
let activeWin = new GetActiveWindow();

activeWin.getActiveWindows().then((window) => {
    console.log(window);
})