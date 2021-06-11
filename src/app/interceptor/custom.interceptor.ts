import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let authReq = request;
        if (request.url.includes('/oauth/token')) {
            authReq = request.clone({
             headers: new HttpHeaders({
                  'Content-Type':  'application/x-www-form-urlencoded',
                  'Authorization': 'Basic '+ btoa('shgupta-client:shgupta-secret')
                })
            });
        }else{
            let accessTokenStr = JSON.parse(window.localStorage.getItem('token')).access_token;
            authReq = request.clone({
                headers: new HttpHeaders({
                     'Content-Type':  'application/json',
                     'Authorization': 'Bearer '+ accessTokenStr
                   })
               });
        }
        return next.handle(authReq);
    }
    
}