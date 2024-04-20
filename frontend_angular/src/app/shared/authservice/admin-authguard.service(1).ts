import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean> {

    const user = sessionStorage.getItem('userData')
    const role = sessionStorage.getItem('role')

    if( user && (role?.includes("admin")) ){
      return true
    }

    if(!user){
      this.router.navigate(['/auth/login'])
    }else{
      this.router.navigate(['/notfound'])
    }
    
    return false
  }
}
