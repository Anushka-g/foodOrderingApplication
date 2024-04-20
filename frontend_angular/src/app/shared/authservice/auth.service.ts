import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Usermodel } from 'src/app/authentication/class/usermodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user = new Subject<Usermodel>()
  user = new BehaviorSubject<any>(null)

  userData:{
    name:string,
    email:string,
    _id:string,
    role:string
    _token:string

  } = JSON.parse(sessionStorage.getItem('userData')!)

  constructor(private _http:HttpClient, private router:Router) { }

  _url = environment.url + "user"
  _logInUrl = environment.url + "user/login"
  _logOutAllUrl = environment.url + "user/logout"

  postUser(user:any):Observable<any>{
    return this._http.post<any>(this._url, user)
  }

  logInUser(user : any):Observable<any>{
    let email = user.email
    let password = user.password
    return this._http.post<any>(this._logInUrl, { email, password}
      ).pipe(tap (response => {
        this.handleAuthentication(
          response.user.name,
          response.user.email,
          response.user._id,
          response.user.role,
          response.token
          )
      }))
  }

  autoLogIn(){

    if(!this.userData){
      return
    }

    const loadedUser = new Usermodel(this.userData.name, this.userData.email,this.userData._id,this.userData.role,this.userData._token)

    if(loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  logOut(){
    sessionStorage.removeItem('userData')
    sessionStorage.removeItem('role')
    this.router.navigate(['/auth/login'])
    return this._http.post<any>(this._logOutAllUrl,{})
  }

  private handleAuthentication (name:string, email:string, _id:string,role:string, token:string){
    const user = new Usermodel (name, email , _id, role, token)
    this.user.next(user);

    sessionStorage.setItem('userData', JSON.stringify(user))
    sessionStorage.setItem('role',JSON.stringify(user.role))
  }

}