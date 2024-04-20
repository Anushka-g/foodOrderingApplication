import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  constructor(private _os:OrderService) { }
  
  records : any

  //@Output() newEvent = new EventEmitter<Boolean>();
  //statusChange : Boolean

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._os.getOrders().subscribe((response) => {
      //console.log(response)
      this.records = response
    })
  }

  remove(id:any){
    this._os.remove(id).subscribe((response) => {
      this.getOrders()
    }, error => {

    })
  }

  onChange(event:any, id:any){
    console.log({ status : event })
    this._os.updateOrder({ status : event },id).subscribe((response) => {
      console.log(response)
      //this.statusChange = true
      //this.newEvent.emit(this.statusChange)
    })
  }

}
