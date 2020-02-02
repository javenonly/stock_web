import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map  } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

import { LogEntry } from './log.service';
import { LogLevel } from './logLevel';

// ****************************************************
// Log Publisher Abstract Class
// NOTE: This class must be located BEFORE
//       all those that extend this class
// ****************************************************
export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>
  abstract clear(): Observable<boolean>;
}

// ****************************************************
// Console Logging Class
// ****************************************************
export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    if (entry.level >= LogLevel.Error) {
      console.error(entry.buildLogString());
    } else {
      console.log(entry.buildLogString());
    }

    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return of(true);
  }
}

// ****************************************************
// Local Storage Logging Class
// ****************************************************
export class LogLocalStorage extends LogPublisher {
  constructor() {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "logging";
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Retrieve previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to array
      values.push(entry);
      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

// ****************************************************
// Logging Web API Class
// ****************************************************
export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "api/service/logging";
  }

  // **************
  // Public Methods
  // **************

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    return this.http.post(this.location, entry)
    .pipe(map(response => true));
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

}