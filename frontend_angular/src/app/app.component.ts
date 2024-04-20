import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/authservice/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private userSub : Subscription

  constructor(private _rps : AuthService){}

  ngOnInit(): void {
    this._rps.autoLogIn()

    this.userSub = this._rps.user.subscribe(user => {

      if(user){
        var element = document.querySelector("#main-content");
        element?.classList.add("active");
      }
    })
  }

  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }

  title = 'foodApp';

}
