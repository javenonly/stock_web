import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LogService } from '../logging/log.service'

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    // const router = this.injector.get(Router);
    let errorMessage = '';
    let loggerService = this.injector.get(LogService);

    if (error instanceof Error) {
      // error
      errorMessage = `Error: ${error.message}\nStack: ${error.stack}`;
      loggerService.error(errorMessage);
    } else if (error.error && error.error instanceof HttpErrorResponse) {
      // http error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage);
    } else {
        // client-side error
        if (error.error && error.error.message) {
          errorMessage = `Error: ${error.error.message}`;
          loggerService.error(errorMessage);
        } else {
          loggerService.error(error.toString());
        }
    }
  }
}
