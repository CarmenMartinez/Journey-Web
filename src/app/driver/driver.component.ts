import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Travel } from '../travels/travel/Travel';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  currentTravel: Travel

  constructor(private router: Router,
    private travelService: TravelService) { }

  ngOnInit(): void {
    this.getCurrentTravel();
  }

  getCurrentTravel(){
    this.currentTravel = this.travelService.getActiveTravel();
  }

  stopCurrentTravel(){
    this.travelService.stopTravel(this.currentTravel.travelId)
    alert("Travel" + this.currentTravel.travelId + " was succesfully stop" )
    this.getCurrentTravel()
  }

  submit(form: NgForm) {
    let producto = form.value.producto
    console.log(producto)
    this.travelService.createTravel(producto)
    this.router.navigate(['/travel']); 
  }
  
}
