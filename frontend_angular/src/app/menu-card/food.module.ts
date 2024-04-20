import { NgModule } from '@angular/core';
import { FoodRoutingModule } from './food-routing.module';
import { FormsModule } from '@angular/forms';
import { RecipeRecordComponent } from '../menu-card/recipe-record/recipe-record.component';
import { AddRecipeFormComponent } from '../menu-card/add-recipe-form/add-recipe-form.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../common/shared.module';
import { OrderRequestsComponent } from './order-requests/order-requests.component';
import { UserPreviousOrdersComponent } from './user-previous-orders/user-previous-orders.component';

@NgModule({
  declarations: [
    AddRecipeFormComponent,
    RecipeRecordComponent,
    OrderMenuComponent,
    DashboardComponent,
    OrderRequestsComponent,
    UserPreviousOrdersComponent,
  ],
  exports:[
    OrderMenuComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    FoodRoutingModule,
  ]
})
export class FoodModule { }
