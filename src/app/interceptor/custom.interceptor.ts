import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';
import { catchError, finalize, retry } from 'rxjs/operators';

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
        }else if(request.url.includes('/file/uploadFile')){
            let accessTokenStr = JSON.parse(window.localStorage.getItem('token')).access_token;
            authReq = request.clone({
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ accessTokenStr
                   })
               });
        }else if(request.url.includes('/users/user')){
            authReq = request.clone({
                headers: new HttpHeaders({
                    'Accept': 'application/json'
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
        return next.handle(authReq).pipe(
            retry(2),
            catchError((error:HttpErrorResponse)=>{
                alert('HTTP Error : '+authReq.url);
                return throwError(error);
            }),
            finalize(()=>{
                console.log(authReq.method+' '+authReq.urlWithParams);
            })
          );
    }
    
}