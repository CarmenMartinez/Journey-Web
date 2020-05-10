import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { TravelComponent } from './travels/travel/travel.component';
import { TravelsComponent } from './travels/travels.component';
import { TravellogComponent } from './travels/travellog/travellog.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DriverComponent } from './driver/driver.component';

import Amplify, { Auth } from 'aws-amplify';
import awsconfigure from './aws-exports';

Amplify.configure(awsconfigure);

const oauth = {
  // Domain name
  domain : 'https://journey-web.auth.us-east-1.amazoncognito.com', 

  // Authorized scopes
  scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 

  // Callback URL
  redirectSignIn : 'http://localhost:4200/viajes', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

  // Sign out URL
  redirectSignOut : 'http://localhost:4200/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

  // 'code' for Authorization code grant, 
  // 'token' for Implicit grant
  // Note that REFRESH token will only be generated when the responseType is code
  responseType: 'code',

  // optional, for Cognito hosted ui specified options
  options: {
      // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
      AdvancedSecurityDataCollectionFlag : false
  }
}

Auth.configure({
  oauth: oauth
});



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TravelComponent,
    TravelsComponent,
    TravellogComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AmplifyAngularModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    })
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
