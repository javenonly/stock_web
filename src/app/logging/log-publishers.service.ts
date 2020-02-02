import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi } from "./log-publishers";

// ****************************************************
// Logging Publishers Service Class
// ****************************************************
@Injectable({ providedIn: 'root' })
export class LogPublishersService {

  constructor(private http: HttpClient) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // *************************
  // Public methods
  // *************************
  // Build publishers array
  buildPublishers(): void {
    if (environment.log.logConsole) {
      // Create instance of LogConsole Class
      this.publishers.push(new LogConsole());
    }
  
    if (environment.log.logLocalStorage) {
      // Create instance of LogLocalStorage Class
      this.publishers.push(new LogLocalStorage());
    }

    if (environment.log.logWebApi) {
      // Create instance of LogWebApi Class
      this.publishers.push(new LogWebApi(this.http));
    }
  }
}