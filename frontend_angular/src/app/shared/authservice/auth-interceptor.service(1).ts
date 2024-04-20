import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _rps:AuthService ) { }

  intercept(req:HttpRequest<any>, next:HttpHandler){
    return this._rps.user.pipe(take(1), exhaustMap(user => {
      if(!user){
        return next.handle(req)
      }
      const modifiedReq = req.clone({
        headers : new HttpHeaders().append('Authorization', 'Bearer '+user.token)
      })
      return next.handle(modifiedReq)
    }))
  }
}
