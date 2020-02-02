import { LogLevel } from "../app/logging/logLevel";

export const environment = {
  production: true,
  serverUrl: "http://47.100.35.188/blw/",
  fileServerUrl: "http://localhost:8080/",
  // serverUrl: "http://47.100.35.188/",
  // fileServerUrl: "http://47.100.35.188/",
  log: {
    loglevel: LogLevel.Error,
    logConsole: false,
    logLocalStorage: false,
    logWebApi: true,
  },
};
