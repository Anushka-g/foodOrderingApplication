import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/menu-card/services/food.service';

@Component({
  selector: 'app-recipe-record',
  templateUrl: './recipe-record.component.html',
  styleUrls: ['./recipe-record.component.css']
})
export class RecipeRecordComponent implements OnInit {

  success:string
  error:string
  foodData:any
  image : any

  constructor(private _fs : FoodService ) { }

  ngOnInit(): void {
    this.getFoodDetails()
  }

  selectImg(event : any){
    if(event.target.files.length > 0){
      const file = event .target.files[0];
      this.image = file;
    }
  }

  getFoodDetails(){
    this._fs.getFood().subscribe((response) => {
      this.foodData = response
    })
  }

  uploadImg(id:any){

    (<HTMLInputElement>document.getElementById('file')).value = ""
    const formData = new FormData()
    formData.append('image', this.image)

    this.success = this.error = ''
    this._fs.uploadImg(formData, id).subscribe((data) => {
      this.success = 'Submitted Successfully !'
    }, error => {
      this.displayError(error)
    })
  }

  displayError(error:any){
    if(error.error.error == 'File too large'){
      this.error = 'upload file having size less than 1 mb'
    }else if(error.error.error){
      this.error = error.error.error
    }else{
      this.error = 'Unknown Error !'
    }
  }

  close(){
    this.success = ''
    this.error = ''
  }
}
