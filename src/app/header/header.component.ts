import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logIn: boolean;
  private subscript: Subscription; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscript = this.authService.isLoggedIn
    .subscribe((value) => {
      this.logIn = value;
    });
  }

  logOut(){
    this.authService.logOut();
  }

}
