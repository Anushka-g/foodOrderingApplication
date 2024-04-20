import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddRecipeFormComponent } from "./add-recipe-form/add-recipe-form.component";
import { RecipeRecordComponent } from "./recipe-record/recipe-record.component";
import { AdminAuthGuardService } from "../shared/authservice/admin-authguard.service";
import { AuthguardService } from "../shared/authservice/authguard.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { UserPreviousOrdersComponent } from "./user-previous-orders/user-previous-orders.component";

const routes: Routes = [
    { path:'', children:[
        {path:'add', component:AddRecipeFormComponent, canActivate:[AdminAuthGuardService]},
        {path:'record', component:RecipeRecordComponent, canActivate:[AdminAuthGuardService] },
        {path:'dashboard',component:DashboardComponent, canActivate:[AuthguardService] },
        {path:'requests', component:OrderRequestsComponent, canActivate:[AdminAuthGuardService] },
        {path:'my', component:UserPreviousOrdersComponent, canActivate: [AuthguardService]}
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FoodRoutingModule { }