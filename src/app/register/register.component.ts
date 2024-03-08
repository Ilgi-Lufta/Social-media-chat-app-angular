import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { registerInterface } from './registerInterface';
import { MyFirstServiceService } from '../my-first-component/my-first-service.service';
import { userService } from '../homepage/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;
  register: registerInterface = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
    Confirm: ''
  };
  constructor(private service:MyFirstServiceService,private userservice1:userService,private router:Router){}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      FirstName: new FormControl<string>("",[Validators.required]),
      LastName: new FormControl<string>("",[Validators.required]),
      UserName: new FormControl<string>("",[Validators.required]),
      Password: new FormControl<string>("",[Validators.required]),
      Confirm: new FormControl<string>("",[Validators.required]),
     // projectStatus: new FormControl(this.pStatus[0]),
      //lessons : new FormArray([])
    });
  }


  onSubmit(form:FormGroup){
    debugger
   let test = form.value.FirstName;
    this.register.FirstName = form.value.FirstName;
    this.register.LastName =form.value.LastName;
    this.register.UserName =form.value.UserName;
    this.register.Password =form.value.Password;
    this.register.Confirm =form.value.Confirm;
      this.userservice1.register(this.register).subscribe(data=>{
        debugger 
       
        localStorage.setItem('data', JSON.stringify(data));
        this.router.navigate(["homepage/"+data.userId]);
            },error=>{
              debugger
              console.log(error)
            }
            );;

  }

}
