import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodService } from 'src/app/menu-card/services/food.service';
import { Food } from '../class/food';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css']
})
export class AddRecipeFormComponent implements OnInit { 

  status = true;
  success:string
  error:string
  owner:string = ""
  add = new Food('','')
  document:any

  constructor(private _fs:FoodService) { }

  ngOnInit(): void {
    this.callFunctionOnPageLoad()
  }

  callFunctionOnPageLoad(){
    const user = sessionStorage.getItem('userData')
    let parseUser = JSON.parse(user!)
    this.owner = parseUser.email
    this.add = new Food('true',this.owner)
  }

  onSubmit(form:NgForm){
    this.success = this.error = ''
    console.log(form.value)
      this._fs.postFood(form.value).subscribe((response) => {
        this.success = 'Submitted Successfully !'
      }, error => {
        this.displayError(error)
      })
    
    this.clearForm(form)
  }

  displayError(error:any){
    if(error.error.errors){
      this.error = 'INVALID ! Pls enter proper data.'
    }else{
      this.error = 'Unknown Error !'
    }
  }

  clearForm(form:NgForm){
    form.controls['name'].reset()
    form.controls['price'].reset()
    form.controls['description'].reset()
  }

  downloadTemplate(){
    this._fs.getCsvFile().subscribe((response) => {
      console.log(response)
      const blob = response;
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob)
      link.download = 'food-template.csv'

      document.body.append(link);
      link.click()
      link.remove()

      setTimeout(()=>{
        URL.revokeObjectURL(link.href),7000
      })

    })
  }

  selectImg(event:any){
    if(event.target.files.length > 0){
      const file = event .target.files[0];
      this.document = file;
    }
    console.log(this.document)
  }

  uploadFile(){
    (<HTMLInputElement>document.getElementById('file')).value = ""
    const formData = new FormData()
    formData.append('csv', this.document)

    this.success = this.error = ''
    this._fs.uploadDocument(formData).subscribe((data) => {
      this.success = 'Submitted Successfully !'
    }, error => {
      console.log(error)
    })
  }

  close(){
    this.success = ''
    this.error = ''
  }

}

