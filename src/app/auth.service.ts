import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = "";
  isLoggedIn = new Subject<boolean>();

  constructor() { }

  isLogged(){
    let isAuth = this.isAuthenticated();
    this.isLoggedIn.next(isAuth);
    return !!isAuth;
  }

  isAuthenticated() : boolean{
    this.token = localStorage.getItem('user');
    return !!this.token;
  }

  logOut(){
    Auth.signOut()
      .then(data => { 
        localStorage.removeItem('user');
        window.location.reload();
      })
      .catch(err => console.log(err));
    this.isLogged();
  }
}
