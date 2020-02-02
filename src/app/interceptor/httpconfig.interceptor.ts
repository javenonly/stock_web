import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { LogService } from '../logging/log.service';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private logger: LogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = localStorage.getItem('user_token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        let orignalUrl = request.url;
        if (request.url.startsWith("api/")) {
            request = request.clone({ url: `${environment.serverUrl}${request.url}`,
            headers: request.headers.set('Accept', 'application/json')  });
        }

        // if (orignalUrl === "api/service/logging") {
        //     return next.handle(request);
        // }

        return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // this.logger.debug('Response->>>', event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user_token');
                localStorage.removeItem('currentUser');
                // location.reload(true);
            }
            let data = {};
            if (environment.production) {
                data = {
                    message: error.message,
                    status: error.status,
                };
            } else {
                data = {
                    message: error.message,
                    error: error.error ?  error.error : 'unknown http error',
                    status: error.status,
                };
            }

            // this.logger.error(JSON.stringify(data));
            console.log(JSON.stringify(data));
            return throwError(error);
        }));
    }
}
