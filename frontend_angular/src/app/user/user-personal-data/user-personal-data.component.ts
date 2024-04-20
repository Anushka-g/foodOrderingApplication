import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPersonalDataService } from '../service/user-personal-data.service';
import { UserPersonalData } from './class/user-personal-data';


@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.css']
})
export class UserComponent implements OnInit {

  showPassword:boolean = false
  user:any
  avatar:any
  success:String
  error:String
  image : any
  url = ""
  id = ""
  loading = false

  userInfo = new UserPersonalData('','','','','')

  constructor(private _us: UserPersonalDataService) { }

  ngOnInit(): void {
    this.getuserData()
  }

  getuserData(){
    this._us.getUserData().subscribe(response => {
      this.loading = true
      this.user = response
      this.userInfo = new UserPersonalData(this.user._id, this.user.name,this.user.email,this.user.phone,this.user.dateOfBirth)
      this.url = environment.url + "user/image/" + this.userInfo._id
    })

    this.loading = false
  }

  getId(){
    let user = sessionStorage.getItem('userData')
    let parseUser = JSON.parse(user!)
    this.id = parseUser.id
  }

  selectImg(event : any){
    if(event.target.files.length > 0){
      const file = event .target.files[0];
      this.image = file;

      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any) => {
        this.url = event.target.result
      }
    }
  }

  uploadAvatar(){

    (<HTMLInputElement>document.getElementById('file')).value = ""
    const formData = new FormData()
    formData.append('image', this.image)

    this.error = this.success = ''

    this._us.postAvatar(formData).subscribe((data) => {
      this.success = 'Submitted Successfully !'
    }, error => {
      this.displayErrorOnImageUpload(error)
    })
  }

  displayErrorOnImageUpload(error:any){
    if(error.error.error == 'File too large'){
      this.error = 'upload file having size less than 1 mb'
    }else if(error.error.error){
      this.error = error.error.error
    }else{
      this.error = 'Unknown Error !'
    }
  }

  onSubmit(userForm:any){
    console.log(userForm.value)
    this.getId()
    this.error = this.success = ''
    this._us.updateUser(this.id, userForm.value).subscribe(response => {
      this.success = 'Records Updated Successfully !'
    },error => {
      this.displayErrorOnUpdateUser(error)
    })
  }

  displayErrorOnUpdateUser(error:any){
    if(error.error.error){
      console.log(error.error.error)
      this.error = error.error.error
    }else if(error.error.errors){
      this.error = 'Invalid Data !'
    }else{
      this.error = 'Unknown Error !'
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  close(){
    this.success = ''
    this.error = ''
  }

}
