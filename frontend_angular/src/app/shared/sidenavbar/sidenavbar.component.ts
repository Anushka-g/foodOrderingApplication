import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authservice/auth.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SideNavBarComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean
  isAdmin:boolean
  private userSub : Subscription
  accepted:boolean = false

  constructor(private _rps: AuthService) { }

  ngOnInit(): void {
    document.querySelector("#check")?.addEventListener('click', function(event){
      document.querySelector("#main-content")?.classList.toggle("active")
    })
    this.userSub = this._rps.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true

      if(user){
        if(user.role == 'admin'){
          this.isAdmin = true
        }
      }
    })
  }

  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }

  onLogOut(){
    this.isAdmin = false

    document.querySelector("#main-content")?.classList.remove("active")
    this._rps.logOut().subscribe(data =>{
      this._rps.user.next(null)
    })
    
  }

}
