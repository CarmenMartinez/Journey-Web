import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Travel } from './travels/travel/Travel';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  travels: Travel [] = []
  activeTravel: Travel = new Travel("", "", "", false);

  constructor(private http:HttpClient) {
    this.http.get('https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel', {
      observe: 'response'
    }).subscribe(
      (res: HttpResponse<Travel[]>) => {
        console.log(res.body)
        this.travels = res.body;
        this.setActiveTravel();
        //this.setTravel(res.body['body'])
      },
      err => console.log(err)
    );
  }

  setActiveTravel(){
    let index = this.travels.findIndex((travel) => travel.status === true)
    this.activeTravel = this.travels[index]
  }

  private setTravel(response: HttpResponse<Travel>) {
    const id = response["id"];
      let t: Travel = {
        travelId: id,
        timestamp: "",
        product: "",
        status: true
      };
      Object.assign(this.activeTravel, t); 
  }

  getActiveTravel(): Travel {
    return this.activeTravel;
  }

  createTravel(product: String) {
  this.http.post("https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel", {
      product: product
    }).subscribe(response => {
      console.log(response);
    });
  }

  stopTravel(travelID: String) {
   this.http.put("https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel", {
     id: travelID
   }).subscribe(response => {
      console.log(response);
   });
  }
  
}
