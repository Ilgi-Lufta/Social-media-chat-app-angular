import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { WeatherInterface } from '../add-my-first/weatherInterface';
import { pipe, tap } from 'rxjs';
import { userInterface } from '../add-my-first/userInterface';
import { registerInterface } from '../register/registerInterface';
import { loginInterface } from '../login/loginInterface';
import { UserInterface } from '../homepage/HomepageInterfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class MyFirstServiceService {
  
  myarray: userInterface [] = 
  [
    {name:"Ilgi",age:5},
    {name:"Fabio",age:15},
    {name:"Agron",age:25}
  ]
  weather! :WeatherInterface[];


 @Output() emiter:EventEmitter<number> = new EventEmitter<number>()

  constructor(private http: HttpClient) { }

  add(name:string,age:number){
    this.myarray.push({name,age})
    }
    remove(id:number){
      console.log(this.myarray)
      this.myarray.splice(id,1);
      console.log(this.myarray)
    }
    
    edit(id:number,name:string,age:number){
      this.myarray[id].name = name;
      this.myarray[id].age = age;
    }
    toggle(id:number){
      this.emiter.emit(id);
    }
    get(id:number): any {
      
     return this.myarray[id];
    }
    add1(){
      debugger
    return  this.http.get< WeatherInterface[]>("https://localhost:7165/WeatherForecast",{headers: new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})})
    .subscribe(
      data=>(this.weather=data)
      )
      
    //   {(data: WeatherInterface[]=>)(this.weather=data)}
    // }
    //return this.http.get<any>("https://localhost:44358/WeatherForecast/get").subscribe();
    };
    getWeather(){
      debugger
      return this.weather;
    }


    add2(){
      debugger
    return  this.http.get< WeatherInterface[]>("https://localhost:7165/WeatherForecast",{headers: new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})})
    
      
    //   {(data: WeatherInterface[]=>)(this.weather=data)}
    // }
    //return this.http.get<any>("https://localhost:44358/WeatherForecast/get").subscribe();
    };
edit2(_userinterface:userInterface,id:number){
  debugger
  this.myarray[id].name = _userinterface.name;
  this.myarray[id].age = _userinterface.age;
}
  // register(register: registerInterface) {
  //   let url = "http://localhost:5223/AngularRegister";
  //   return this.http.post<registerInterface>(url, register
  //     , {
  //       headers: new HttpHeaders
  //         (
  //           {
  //             // 'Access-Control-Allow-Origin': '*',
  //             // 'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
  //             // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //             'Content-Type': 'application/json; charset=utf-8'
  //           }
  //         )
  //     }
  //   ).pipe(tap(data=>{
  //     this.iLoguari=data
  //   }))
  // }

  // login(login: loginInterface) {
  //   let url = "http://localhost:5223/AngularLogin";
  //   return this.http.post<UserInterface>(url, login
  //     , {
  //       headers: new HttpHeaders
  //         (
  //           {
  //             // 'Access-Control-Allow-Origin': '*',
  //             // 'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
  //             // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //             'Content-Type': 'application/json; charset=utf-8'
  //           }
  //         )
  //     }
  //   ).pipe(tap(data=>{
  //     this.iLoguari=data
  //   }))
  // }

}
