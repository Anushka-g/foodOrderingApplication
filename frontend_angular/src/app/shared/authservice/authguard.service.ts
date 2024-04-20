import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean> {

    const user = sessionStorage.getItem('userData')
    const role = sessionStorage.getItem('role')

    if( user && (role?.includes("visitor") || role?.includes("admin") ) ){
      return true
    }

    this.router.navigate(['/auth/login'])
    
    return false
  }
}
