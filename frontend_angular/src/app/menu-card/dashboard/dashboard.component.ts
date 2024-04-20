import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  total:number
  lengthOfOrdersArray:number = 0
  amount:number = 0
  error : string
  success : string
  loading = false

  orders: {
    _id:string,
    name:string,
    price:string,
    quantity:number,
    total:number
  }[] = []

  foods:any
  actualFoodItems:any

  constructor(private _fs : FoodService, private _os:OrderService) { }

  ngOnInit(): void {
    this.getFood()
    this.getMyOrders()
  }

  getFood(){
    this._fs.getFood().subscribe((response: any) => {
      this.loading = true
      this.actualFoodItems = response
      this.foods = this.actualFoodItems
    })

    this.loading = false
  }

  getOrderDetails(){
    this.amount = 0
    this.orders = this._os.order
    this.lengthOfOrdersArray = this.orders.length
    
    for(let i = 0; i < this.lengthOfOrdersArray; i++){
      this.amount += this.orders[i].total
    }
  }

  deleteOrder(order:any){
    this._os.deleteFood(order)
    this.amount = this.amount - order.total
    this.lengthOfOrdersArray = this.orders.length
  }

  placeOrder(){
    this._os.postUserOrder(this.orders).subscribe(response => {
      this.success = 'Your Order is Placed !'
    }, error => {
      this.error = 'Error occured ! Try after sometime !'
    })
    this._os.order.length = 0
    this.lengthOfOrdersArray = 0

    this.close()
  }

  close(){
    setTimeout(() => {
      this.success = ''
      this.error = ''
    },2000)
  }


  searchItems(event:any){
    let result = []
    let input = event.target.value
    if(input.length){
      result = this.actualFoodItems.filter((item:any) => {
        return item.name.toLowerCase().includes(input.toLowerCase())
      })
    }else{
      result = this.actualFoodItems
    }

    this.renderResults(result)
  }

  renderResults(result:any){
    if(result.length){
      this.foods = result
    }else{
      this.foods = []
    }
  }

  inProgressOrders : any

  getMyOrders(){
    this._os.getMyPreviousOrders().subscribe((response) => {
      this.inProgressOrders = response
    })
  }


}
