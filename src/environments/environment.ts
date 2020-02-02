// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { LogLevel } from "../app/logging/logLevel";
export const environment = {
  production: false,
  serverUrl: "http://localhost:8080/",
  fileServerUrl: "http://localhost:8080/",
  // serverUrl: "http://47.100.35.188/blw/",
  // fileServerUrl: "http://47.100.35.188/",
  log: {
    loglevel: LogLevel.Debug,
    logConsole: true,
    logLocalStorage: false,
    logWebApi: false,
  },
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
