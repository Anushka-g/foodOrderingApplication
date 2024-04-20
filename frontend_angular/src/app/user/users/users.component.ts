import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from '../service/users.service';
import { Users } from './class/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any
  loading = false
  usersInfo = new Users('','','','','','','')
  url = ""
  isAccountStatusActive = false

  constructor(private _users:UsersService) { }

  ngOnInit(): void {
    this.getUsers()
    this.url = environment.url + "user/image"
  }

  getUsers(){
    this._users.getUsers().subscribe(data => {
      this.loading = true
      this.users = data
    }, error =>{
    })

    this.loading = false
  }

  getCurrentUser(){
    const user = sessionStorage.getItem('userData')
    let parseUser = JSON.parse(user!)
    const email = parseUser.email
    return email
  }

  updateAccount(user:any){
    const email = this.getCurrentUser()
    if(user.email == email){
      
    }

    let isCheck = document.getElementById("myCheck") as HTMLInputElement
    if(user.isActiveAccount == 'false'){
      isCheck.checked = false
      this.isAccountStatusActive = false
    }else{
      isCheck.checked = true
      this.isAccountStatusActive = true
    }
    this.usersInfo = new Users(user._id, user.name, user.email,user.gender, user.phone, user.dateOfBirth, user.isActiveAccount)
  }

  saveChanges(user:any){
    if(document.querySelector('#myCheck:checked') !== null){
      user.isActiveAccount = "true"
    }else{
      user.isActiveAccount = "false"
    }
    this._users.deactivateUser(user, user._id).subscribe(data=>{
      this.getUsers()
    })
  }

  delete(id:any){
    this._users.deleteUser(id).subscribe(()=>{
      this.getUsers()
    },error => {

    })
  }

}
