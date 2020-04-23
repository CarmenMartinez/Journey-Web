import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TravelComponent } from './travel/travel.component';


const routes: Routes = [
  {path: '', component: TravelComponent},
  //{path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
