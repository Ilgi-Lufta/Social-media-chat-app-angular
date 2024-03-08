import { Component, Input, OnInit } from '@angular/core';

import { MyFirstServiceService } from '../my-first-component/my-first-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userInterface } from '../add-my-first/userInterface';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-my-first',
  templateUrl: './edit-my-first.component.html',
  styleUrls: ['./edit-my-first.component.css']
})
export class EditMyFirstComponent implements OnInit {

  @Input() Id:number=0;
  id!:number;
  name:string="";
  age:number=0;
  clicked:boolean=false;
  User!:userInterface;
  myForm!: FormGroup;



  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.id= +(data['id']);
      debugger
      this.User = this.userservice.get(this.id);
    
    this.myForm = new FormGroup({
      name: new FormControl(this.User.name,[Validators.required,this.MyCustomValidator()]),
      age: new FormControl(this.User.age,[Validators.required]),
    });
  })
  }
 
constructor(private myFirstServiceService : MyFirstServiceService,private route: ActivatedRoute,private userservice: MyFirstServiceService,private router: Router){}
  editUser(){
        debugger
        this.myFirstServiceService.edit(this.id,this.name,this.age)
        this.name="";
        this.age=0;
  }
  MyCustomValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
  
        const value = control.value;
  
        if (value !== "Test") {
            return null;
        }
        return  {wrongUsernme:true};
    }
  }


  onSubmit(form: FormGroup) {
    debugger
    console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('projectStatus', form.value.projectStatus);
    console.log(form); // true or false
let user:userInterface={name:form.value.name,age:form.value.age}
debugger
    this.myFirstServiceService.edit2(user,this.id);
    this.router.navigate(['users'])

  }
}
  

 


  

 

 
 

