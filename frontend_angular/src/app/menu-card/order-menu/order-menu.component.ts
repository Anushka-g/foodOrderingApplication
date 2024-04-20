import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/menu-card/services/order.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})
export class OrderMenuComponent implements OnInit {

  @Input()
  f:{
    _id:string,
    name:string,
    price:string,
    isVegan:string,
    quantity:string,
    isAddedToFavourite:string
  }

  total:number
  url = ""

  constructor(private _os:OrderService) { }

  ngOnInit(): void {
    this.url = environment.url + 'food/image'
  }

  toggleIcon(food:any){
    food.isAddedToFavourite = !food.isAddedToFavourite
  }

  addFoodToOrderList(food:any){
    this.total =  0
    this._os.addFood(food._id,food.name, food.price,food.quantity , this.total)
  }

  plusOne(food:any){
    food.quantity = food.quantity + 1
  }

  minusOne(food:any){
    if(food.quantity > 1){
      food.quantity = food.quantity - 1
    }
  }

  preventKeyPress(event:any){
    event.preventDefault()
  }

}
