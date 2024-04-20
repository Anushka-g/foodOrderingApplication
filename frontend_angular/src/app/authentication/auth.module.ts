import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../common/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations:[
        LoginComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule{ }