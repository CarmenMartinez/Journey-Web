import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private router: Router,
    private travelService: TravelService) { }

  ngOnInit(): void {

  }

  submit(form: NgForm) {
    let producto = form.value.producto
    console.log(producto)
    this.travelService.createTravel(producto)
    this.router.navigate(['/travel']); 
  }
  
}
