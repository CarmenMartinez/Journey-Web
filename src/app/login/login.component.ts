import { Component, OnInit } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    window.location.assign("https://journey-web.auth.us-east-1.amazoncognito.com/login?client_id=5m6lhtolg0q7ti41cehk5ccnt5&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:4200/viajes");
  }

  submit(formulario: NgForm) {
    
    formulario.reset();
    this.router.navigate(['/viajes']);
  }

}
