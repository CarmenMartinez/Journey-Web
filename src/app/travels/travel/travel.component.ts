import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    console.log(this.travelService.getTravel());
  }



}
