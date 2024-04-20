import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  _getUrl = environment.url + "foods"
  _postUrl = environment.url + "food"
  img_url = environment.url + "food/upload"
  _getCsvFile_Url = environment.url + "json2csv/foods"
  _postCsvFile_Url = environment.url + "csv2json/foods"

  constructor(private _http: HttpClient) { }

  getFood(){
    return this._http.get<any>(this._getUrl)
    .pipe(map(foods => {
      return foods.map((foods: any) => {
        return {...foods, quantity: 1, isAddedToFavourite:false}
      })
    }))
  }

  postFood(data:any){
    return this._http.post(this._postUrl, data)
  }

  uploadImg(formData: FormData, id:any){
    return this._http.post(`${this.img_url}/${id}`, formData)
  }

  getCsvFile(){
    return this._http.get(this._getCsvFile_Url, { responseType : 'blob' })
  }

  uploadDocument(formData: FormData){
    return this._http.post(this._postCsvFile_Url, formData)
  }

}
