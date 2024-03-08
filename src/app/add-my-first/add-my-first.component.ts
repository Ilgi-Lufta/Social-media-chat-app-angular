import { Component,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MyFirstServiceService } from '../my-first-component/my-first-service.service';
import { WeatherInterface } from './weatherInterface';

@Component({
  selector: 'app-add-my-first',
  templateUrl: './add-my-first.component.html',
  styleUrls: ['./add-my-first.component.css']
})
export class AddMyFirstComponent  {
    
    
    name:string="";
    age:number=0;
    // data=
    // {date: '2023-07-08T13:38:14.3434528+02:00', temperatureC: -5, temperatureF: 24, summary: 'Mild'};
    data!: WeatherInterface[];

constructor(private myFirstServiceService : MyFirstServiceService){}


    adduser(){
      this.myFirstServiceService.add(this.name,this.age)
      this.name="";
      this.age=0;
    }
    getdata(){
      debugger
    this.myFirstServiceService.add1();
    // .subscribe(data=>
    //   {this.data=data}
    //     );
    
    }

    
}
