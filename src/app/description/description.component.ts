import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFirstServiceService } from '../my-first-component/my-first-service.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  @Input() User :any=null;
  User2!: { name: string; age: number; };
  constructor(private route: ActivatedRoute,private userservice: MyFirstServiceService) { }
  ngOnInit(): void {
    
    // this.route.queryParams
    // .subscribe(params => {
    //   console.log(params['id']); 
    // })
    this.route.params.subscribe(data=>{
      const  ilgi= data['id'];
      debugger
      this.User2 = this.userservice.get(+ilgi);
    })
    console.log(this.route.snapshot.params['id']);
  //  let ilgi = this.route.snapshot.params['id'];
  //  debugger
  //   this.User2 = this.userservice.get(+ilgi);
    console.log(this.User2.name);
  }
 
 
  
}

