import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authservice/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean
  private userSub : Subscription

  constructor(private _rps:AuthService) { }

  ngOnInit(): void {
    this.userSub = this._rps.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    })
  }

  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }

  onLogOut(){
    this._rps.logOut().subscribe(data =>{
      this._rps.user.next(null)
    })
  }

}
