import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/404/notFound.component';

const routes: Routes = [
  { path:'notfound', component:NotFoundComponent },
  { path:'', redirectTo:'food/dashboard', pathMatch:'full'},
  { path:'user', loadChildren: () => import('./user/user.module').then(u => u.UserModule) },
  { path:'auth', loadChildren: () => import('./authentication/auth.module').then(a => a.AuthModule)},
  { path:'food', loadChildren:() => import('./menu-card/food.module').then(f => f.FoodModule)},
  { path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
