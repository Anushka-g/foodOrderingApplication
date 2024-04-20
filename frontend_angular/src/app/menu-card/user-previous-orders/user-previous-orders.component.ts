import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-user-previous-orders',
  templateUrl: './user-previous-orders.component.html',
  styleUrls: ['./user-previous-orders.component.css']
})
export class UserPreviousOrdersComponent implements OnInit {

  constructor(private _os : OrderService) { }

  orders : any
  _id : string
  empty : boolean

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._os.getMyPreviousOrders().subscribe((response)=>{
      this.orders = response
      if(this.orders.length == 0){
        this.empty = true
      }
    },error => {

    })
  }

}
