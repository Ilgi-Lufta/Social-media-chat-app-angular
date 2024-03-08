import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { userService } from '../homepage/user-service.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

constructor(private userService1:userService,private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        debugger
        if(req.url.includes('login')|| req.url.includes('register')){
         let user=  this.userService1.getStorage()
    if(user.token!==""){
debugger
        let newReq = req.clone({
             headers: req.headers.set('Authorization', ` ${user.token}`),
         });
     return next.handle(newReq);
    }
    debugger    
        }
     
    return next.handle(req);
  }
}