import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user-personal-data/user-personal-data.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../common/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
