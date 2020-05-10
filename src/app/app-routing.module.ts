import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TravelComponent } from './travels/travel/travel.component';
import { TravellogComponent } from './travels/travellog/travellog.component';
import { TravelsComponent } from './travels/travels.component';
import { DriverComponent } from './driver/driver.component';
import { AuthguardService } from './authguard.service';



const routes: Routes = [
  {path: '', component: LoginComponent},
  //{path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'viajes', component: TravelsComponent, canActivate: [AuthguardService], children: [
    {path: '', component: TravelComponent},
     {path: ':id', component: TravellogComponent},

  ]},
  {path: 'conductores', canActivate: [AuthguardService], component: DriverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
