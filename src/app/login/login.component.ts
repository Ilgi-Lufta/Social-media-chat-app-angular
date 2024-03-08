import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyFirstServiceService } from '../my-first-component/my-first-service.service';
import { loginInterface } from './loginInterface';
import { Router } from '@angular/router';
import { userService } from '../homepage/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  myForm!: FormGroup;
  login: loginInterface = {
    UserName: '',
    Password: ''
  };
  
  constructor(private service:MyFirstServiceService,private router:Router,private userService1:userService){}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      UserName: new FormControl<string>("",[Validators.required]),
      Password: new FormControl<string>("",[Validators.required]),
  })
}

onSubmit(form:FormGroup){
  debugger
 let test = form.value.FirstName;
  this.login.UserName =form.value.UserName;
  this.login.Password =form.value.Password;
    this.userService1.login(this.login).subscribe(data=>{
      debugger 
      let ilgi = data;
      localStorage.setItem('data', JSON.stringify(data));
        this.userService1.getUser(+data.userId);

      this.router.navigate(["homepage/"+data.userId]);
          },error=>{
            debugger
            this.router.navigate(["register"]);
          }
          );

}


}
