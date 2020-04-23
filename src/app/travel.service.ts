import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  activeTravel: String;
  constructor(private http: HttpClient) {
    this.activeTravel = "";
    this.http.get("https://9vy4d36mji.execute-api.us-east-1.amazonaws.com/Sandbox/travel", {
        observe: 'response'
    }).subscribe(
      (res: HttpResponse<String> ) => {
        console.log(res["body"]["body"].id);
      },
    err => console.log(err)
      
    );
   }

   getTravel(): String {
     return "ki oñda";
   }
}
