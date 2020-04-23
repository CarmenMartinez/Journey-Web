import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TravelComponent } from './travels/travel/travel.component';
import { TravellogComponent } from './travels/travellog/travellog.component';



const routes: Routes = [
  {path: '', component: TravelComponent},
  //{path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'travellog', component: TravellogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
