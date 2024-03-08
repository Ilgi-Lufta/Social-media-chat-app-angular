import { Component, OnInit } from '@angular/core';

import { MyFirstServiceService } from './my-first-service.service';




@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent implements OnInit  {
  
  myarray: {name:string,age:number} [] = [];
  clicked:boolean=false;
  Id:number=0;
  showDiscription:boolean=false;
  index:number=0;

constructor(private myFirstServiceService : MyFirstServiceService){}

  ngOnInit(): void {

    this.myarray = this.myFirstServiceService.myarray;
    this.myFirstServiceService.emiter.subscribe((res)=>{
      this.clicked = !this.clicked;
      this.Id=res
     })
  }

  remove(id:number){
    this.myFirstServiceService.remove(id);
    console.log(id);
    this.myFirstServiceService.toggle(id);

  }
  
  toggle(id:number){
    this.myFirstServiceService.toggle(id);
    
   }
   showDiscriptionFunc(id:number){
    this.index=id;
    this.showDiscription=!this.showDiscription
   }
}

