import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAuthGuardService } from "../shared/authservice/admin-authguard.service";
import { AuthguardService } from "../shared/authservice/authguard.service";
import { UserComponent } from "./user-personal-data/user-personal-data.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {path: '', children:[
        {path:'me',component: UserComponent, canActivate:[AuthguardService]},
        {path:'all', component: UsersComponent, canActivate:[AdminAuthGuardService] },
    ]},  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }