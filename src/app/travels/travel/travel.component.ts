import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/travel.service';
import { Travel } from './Travel';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  activeTravel: Travel;
  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    this.activeTravel = this.getActiveTravel();


  }

  getActiveTravel(): Travel{
      return this.travelService.getActiveTravel();
  }

  createTravel(product: string){
    this.travelService.createTravel(product);
  }

  stopTravel(travelID: string) {
    this.travelService.stopTravel(travelID);
  }
}
