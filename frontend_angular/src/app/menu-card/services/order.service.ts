import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  postUrl = environment.url + "orders"
  getUrl = environment.url + "get/orders"
  deleteUrl = environment.url + "remove"
  updateUrl = environment.url + "update/order"
  getMyOrderUrl = environment.url + "my/orders"

  order: {
    _id:string
    name:string,
    price:string,
    quantity:number,
    total:number
  }[] = []

  constructor(private _http:HttpClient, private toastr:ToastrService) { }

  addFood(_id:string, name:string, price:string, quantity:number, total:number){

    total = quantity * Number(price)
    if(!this.order.length){
      this.order.push({ _id:_id,name: name , price: price, quantity:quantity, total:total})
    }else{
        let duplicate = this.order.find(item => item._id === _id)
        if(duplicate?.quantity){
          duplicate.quantity = quantity
          duplicate.total = total
        }

        if(!duplicate){
          this.order.push({ _id:_id,name: name , price: price, quantity:quantity, total:total})
        }
      }
    
    this.toastr.success('Food is added, Quantity : ' + quantity, 'Success!', {
      timeOut: 2000,
      progressBar:true,
      progressAnimation:'increasing'
    })  
  }

  deleteFood(order:any){
    this.order.splice(this.order.indexOf(order), 1)
  }

  postUserOrder(order:any){
    return this._http.post(this.postUrl, order)
  }

  getOrders(){
    return this._http.get(this.getUrl)
  }

  remove(id:any){
    return this._http.delete(`${this.deleteUrl}/${id}`)
  }

  updateOrder(order:any, id:any){
    return this._http.patch(`${this.updateUrl}/${id}`,order)
  }

  getMyPreviousOrders(){
    return this._http.get(this.getMyOrderUrl)
  }
}
