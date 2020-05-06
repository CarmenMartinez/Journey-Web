import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Travel } from './travels/travel/Travel';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  public travels: Travel [] = []
  activeTravel: Travel = new Travel("", new Date(), "", false);
  
  travelSubject = new Subject<Travel[]>();

  constructor(private http:HttpClient) {
    this.requestTravels();
  }


  createTravel(product: String) {
    this.http.post("https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel", {
      product: product
    }).subscribe(response => {
      console.log(response);
    });
  }
  
  getActiveTravel(): Travel {
    return this.activeTravel;
  }

  getTravels(): Travel[] {
    return this.travels;
  }

  pushChanges() {
    this.travelSubject.next(this.travels.slice());
  }

  refreshTravels() {
    this.requestTravels();
    this.getTravels();
  }

  requestTravels() {
    this.http.get('https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel', {
      observe: 'response'
    }).subscribe(
      (res: HttpResponse<Travel[]>) => {
        this.setTravel(res.body);
        this.setActiveTravel();
      },
      err => console.log(err)
    );
  }

  setActiveTravel(){
    let index = this.travels.findIndex((travel) => travel.status === true);
    if(index != -1){
      Object.assign(this.activeTravel, this.travels[index]);
    }
  }

  private setTravel(response: Travel[]) {
    response.forEach(travel => {
      let newDate = new Date(Number(travel.timestamp)* 1000);
      travel.timestamp = newDate;
    });
    Object.assign(this.travels, response);
  }

  stopTravel(travelID: String) {
    this.http.put("https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel", {
      id: travelID
    }).subscribe(response => {
       console.log(response);
    });
   }
  
}
