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
  travels: Travel[] = [
    new Travel("1", "a1", "b1", true),
    new Travel("2", "a2", "b2", false),
    new Travel("3", "a3", "b3", false),
    new Travel("4", "a4", "b4", false)
  ]
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
