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
    alert("Travel " + this.currentTravel.travelId + " was succesfully stop" )
    this.getCurrentTravel()
  }

  submit(form: NgForm) {
    if(!form.value.product || form.value.displayName) return

    let requestBody = {}
    requestBody['product'] = form.value.product

    requestBody['displayName'] = form.value.displayName
    
    if(form.value.unity)
      requestBody['unity'] = form.value.unity

    if(form.value.description)
      requestBody['description'] = form.value.description
    
    this.travelService.createTravel(requestBody)
    this.router.navigate(['/travel']); 
  }
  
}
