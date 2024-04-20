import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPersonalDataService {

  _updateUrl = environment.url + "user"
  _url= environment.url + "user/me"
  _sendImgUrl = environment.url + "user/upload"

  constructor(private _http:HttpClient) { }

  getUserData(){
    return this._http.get(this._url)
  }

  postAvatar(data:any){
    return this._http.post(this._sendImgUrl, data)
  }

  updateUser(id:any, data:any){
    return this._http.patch(`${this._updateUrl}/${id}`,data)
  }

}
