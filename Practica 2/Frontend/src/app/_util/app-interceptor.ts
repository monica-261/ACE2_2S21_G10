import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private cookieService: CookieService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const authToken = this.getSessionId();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        return next.handle(authReq).pipe(catchError(err => {
            if (err.status === 401) {
                window.location.href = environment.urlLogin;
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        })
        );
    }

    getSessionId() {
        const value: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXJhbmdvIiwidXNlcklkIjo3MTExNywidXNlcm5hbWUiOiJqYXJhbmdvIiwicm9sZSI6IiIsInNvY2lhbElkIjoiIiwiaWF0IjoxNjMzNzA0MDk1LCJleHAiOjE2MzM3OTA0OTV9.yaMQunBuk7Y9pdV7EaTi_p1JrfYBVDe31yG2liU67xN7Q7ymmsMA9jeZXkLbtb4VPALlX2Gee7S1cl5GO0XqoA';//this.cookieService.get('SESSIONID');
        if (!value) {
            window.location.href = environment.urlLogin;
        }
        return 'Bearer ' + value;
    }
}
