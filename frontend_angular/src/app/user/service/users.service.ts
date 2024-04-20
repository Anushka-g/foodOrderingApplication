import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _url = environment.url + "users"
  _deactivateUserUrl = environment.url + "user/deactivate"
  _deleteUrl = environment.url + "delete"

  constructor(private _http:HttpClient) { }

  getUsers(){
    return this._http.get(this._url)
  }

  deactivateUser(data:any, id:any){
    return this._http.patch(`${this._deactivateUserUrl}/${id}`, data)
  }

  deleteUser(id:any){
    return this._http.delete(`${this._deleteUrl}/${id}`)
  }

}