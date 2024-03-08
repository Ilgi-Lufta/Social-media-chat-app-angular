import { Component, OnInit } from '@angular/core';
import { MyFirstServiceService } from '../my-first-component/my-first-service.service';
import { WeatherInterface } from '../add-my-first/weatherInterface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  weather! :WeatherInterface[];
  constructor(private myFirstServiceService : MyFirstServiceService){}
  ngOnInit(): void {
    debugger
    this.RefreshWeather();
   
  }
  
RefreshWeather(){
  this.myFirstServiceService.add2().subscribe(
    data=>(this.weather=data)
    );
}
  

}
