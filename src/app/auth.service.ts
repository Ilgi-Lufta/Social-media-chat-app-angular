import { Injectable } from '@angular/core';
import { userService } from './homepage/user-service.service';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService1 :userService) { }

  isAuthenticated(){
debugger
   let user= this.userService1.getStorage();
   if(user!== null){
    let now= new Date().getTime();
   let expiresIn= new Date(user.expiresIn).getTime();
   if( user === undefined )
    return false;
  
    else if (user.token === "")
   return false;

   else if(expiresIn < now )
    return false
   }
   else{
    return false
   }
   
  return true

  }

  
}
