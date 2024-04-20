import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './shared/navbar/navbar.component';
import { NotFoundComponent } from './shared/404/notFound.component';
import { CoreModule } from './core.module';
import { SideNavBarComponent } from './shared/sidenavbar/sidenavbar.component';
import { SharedModule } from './common/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavBarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 