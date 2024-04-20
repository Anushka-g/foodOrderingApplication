import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error : string
  success : string
  showPassword = false;
  isLoginPage = true;

  constructor(private _rps:AuthService, private router:Router) { }

  switchToSignUp(){
    this.isLoginPage = !this.isLoginPage
  }

  onSubmit(userForm:NgForm){
    if(this.isLoginPage){
      this._rps.logInUser(userForm.value).subscribe((data) => {
        this.router.navigate(['/food/dashboard'])
        var element = document.querySelector("#main-content");
        element?.classList.add("active");
        (<HTMLInputElement>document.querySelector("#check")).checked = false
      },error => {
        this.displayError(error)
      })
    }
    
    else{
      this._rps.postUser(userForm.value).subscribe((data) => {
        this.displaySuccessMessage(userForm)
      },error => {
        this.displayErrorMessage(error)
      })
    }

    userForm.reset()
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.setTimeoutFunctionforPassword()
  }

  displaySuccessMessage(userForm:any){
    if(userForm.value){
      this.success = 'REGISTRATION SUCCESSFUL !'
    }
  }

  displayErrorMessage(error:any){
    console.log(this.error)
    if(error.error.error == 'Found a duplicate !'){
      this.error = 'EMAIL ALREADY EXISTS !'
    }  
    else if(error.error.errors){
      this.error = 'INVALID ! Pls enter proper data.'
    }else{
      this.error = 'Unknown Error !'
    }
  }

  displayError(error:any){
    if(error.error.errors){
      this.error = error.error.errors
    }else{
      this.error = 'Unknown Error !'
    }
  }

  close(){
    this.success = ''
    this.error = ''
  }

  setTimeoutFunctionforPassword(){
    setTimeout(() => {
      this.showPassword = false
    },1000)
  }

}
