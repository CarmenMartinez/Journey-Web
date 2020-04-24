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
  }

  submit(formulario: NgForm) {
    
    formulario.reset();
    this.router.navigate(['/travel']);
  }

}
