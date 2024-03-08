import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { WeatherInterface } from '../add-my-first/weatherInterface';
import { debounceTime, distinctUntilChanged, pipe, tap } from 'rxjs';
import { userInterface } from '../add-my-first/userInterface';
import { registerInterface } from '../register/registerInterface';
import { loginInterface } from '../login/loginInterface';
import { UserInterface } from './HomepageInterfaces/UserInterface';
import { RequestInterface } from './HomepageInterfaces/RequestInterface';
import { PostInterface } from './HomepageInterfaces/PostInterface';
import { LikeInterface } from './HomepageInterfaces/LikeInterface';
import { Form, FormGroup } from '@angular/forms';
import { CommentInterface } from './HomepageInterfaces/CommentInterface';
import { postAddInterface } from './HomepageInterfaces/postAddInterface';
import { MessageInterface } from '../chat/MessageInterface';

@Injectable({
  providedIn: 'root'
})
export class userService {
  iLoguari!:UserInterface;
  AllUsers!:UserInterface[];
  AllFriends!:RequestInterface[];
  AllPosts!:PostInterface[];
  requests!:RequestInterface[];



 @Output() emiter:EventEmitter<number> = new EventEmitter<number>()

  constructor(private http: HttpClient) { }

  getLogedUser(){
    return this.iLoguari;
  }
  getAllUsers(){
    return this.AllUsers;
  }
  getAllFriends(){
    return this.AllFriends;
  }
  Logout(){
    this.iLoguari.token = "";
    this.iLoguari.expiresIn = new Date('1970-01-01Z00:00:00:000');
    localStorage.removeItem("data");
  }
  



  register(register: registerInterface) {
    let url = "http://localhost:5223/AngularRegister";
    return this.http.post<UserInterface>(url, register
      , {
        headers: new HttpHeaders
          (
            {
              // 'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
              // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{
      this.iLoguari=data
    }))
  }

  login(login: loginInterface) {
    let url = "http://localhost:5223/AngularLogin";
    return this.http.post<UserInterface>(url, login
      , {
        headers: new HttpHeaders
          (
            {
              // 'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
              // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{
      this.iLoguari=data
    }))
  }

   
  GetiLoguari(id: number) {
    let id1= id.toString();
    let url = "http://localhost:5223/User/"+id1;
    return this.http.get<UserInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
   
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{
      this.iLoguari=data
    }))
  }
  GetAllUsers(id: number) {
  let id1= id.toString();
    let url = "http://localhost:5223/GetAllUsers/"+id1;
   return  this.http.get<UserInterface[]>(url, 
       {
        headers: new HttpHeaders
          (
            {
                'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
               'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{
      this.AllUsers=data
    }))
    
  }
  GetAllfriends(id: number) {
  let id1= id.toString();
    let url = "http://localhost:5223/GetAllfriends/"+id1;
    return this.http.get<RequestInterface[]>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{
      this.AllFriends=data
    }))
  }

  GetAllPosts(id: number) {
    let id1= id.toString();
      let url = "http://localhost:5223/GetAllPosts/"+id1;
      return this.http.get<PostInterface[]>(url, 
         {
          headers: new HttpHeaders
            (
              {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-Type': 'application/json; charset=utf-8'
              }
            )
        }
      ).pipe(tap(data=>{
        this.AllPosts=data
      }))
    }
    GetAllrequests(id: number) {
    let id1= id.toString();
      let url = "http://localhost:5223/GetAllRequests/"+id1;
      return this.http.get<RequestInterface[]>(url, 
         {
          headers: new HttpHeaders
            (
              {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-Type': 'application/json; charset=utf-8'
              }
            )
        }
      ).pipe(tap(data=>{
        this.requests=data
      }))
    }



  
  SendR(id: number) {
debugger
    let url = "http://localhost:5223/AngularSendR/"+id.toString() +"/"+this.iLoguari.userId.toString();
    return this.http.get<RequestInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Content-Type': 'application/json; charset=utf-8'
            }
          ),
      }
    )
  }
  
  RemoveF(id: number) {
  
    let url = "http://localhost:5223/AngularRemoveF/"+id.toString();
    return this.http.get<RequestInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  AcceptR(id: number) {
  
    let url = "http://localhost:5223/AngularAcceptR/"+id.toString();
    return this.http.get<RequestInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  DeclineR(id: number) {
    let url = "http://localhost:5223/AngularDeclineR/"+id.toString();
    return this.http.get<RequestInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  SearchUsers(filter:string)
  {
    let url = "http://localhost:5223/SearchUsers"
    let queryParams = new HttpParams();
    queryParams = queryParams.append("searchString",filter);

    return this.http.get<UserInterface[]>(url, 
       {
        headers: new HttpHeaders
          (
            {
              'Content-Type': 'application/json; charset=utf-8'
            }
          ),
          params:queryParams
      }
    )
  }

  getUser(id: number) {
    let id1= id.toString();
    debugger
    let url = "http://localhost:5223/GetUser/"+id1;
    return this.http.get<UserInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
   
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    ).pipe(tap(data=>{this.iLoguari = data}))
  }
  Like(Postid:number){
    let id1=Postid.toString();

    let url = "http://localhost:5223/Like/"+this.iLoguari.userId.toString()+"/"+id1;
    return this.http.get<LikeInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
   
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  UnLike(Postid:number){
    let id1= Postid.toString();
    let url = "http://localhost:5223/UnLike/"+this.iLoguari.userId.toString()+"/"+id1;
    return this.http.get<LikeInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
   
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  CommentCreate(form:FormGroup,Postid:number){
    let id1= Postid.toString();
    let content = form.value.comment;
    let url = "http://localhost:5223/CommentCreate/"+this.iLoguari.userId.toString()+"/"+id1+"/"+content;
    ;
    return this.http.post<CommentInterface>(url, 
       {
        headers: new HttpHeaders
          (
            {
   
              'Content-Type': 'application/json; charset=utf-8'
            }
          )
      }
    )
  }
  ProfileImage(formData:FormData){
debugger
  let url = "http://localhost:5223/ProfileImage/"+this.iLoguari.userId.toString();
  // let body = new Body();
  return this.http.post<UserInterface>(url,formData
  
    //  {
    //   headers: new HttpHeaders
    //     (
    //       {
 
    //         'Content-Type': 'application/json; charset=utf-8'
    //       }
    //     ), 
       
    // }
  )
}
GetImage(img:string){

  let url = "http://localhost:5223/Images/"+img;
  // let body = new Body();
  return this.http.post<any>(url,
  
     {
      headers: new HttpHeaders
        (
          {
 
            'Content-Type': 'application/json; charset=utf-8'
          }
        ), 
       
    }
  )
}

PostAdd(formData1:FormData){
    let url = "http://localhost:5223/PostCreate/"+this.iLoguari.userId.toString();
    return this.http.post<UserInterface>(url,formData1
    )
  }

  getStorage(){
    if(localStorage.getItem('data')){

      let User =JSON.parse((localStorage.getItem('data') ||'' ).toString());
      return User;
    }
return null
  }
autoLogOut()
{
 let user= this.getStorage();
 if(user!== null){
  let expires = new Date(user.expiresIn).getTime()
 let now = new Date().getTime()
 if(expires<now){

   localStorage.removeItem("data")
   return true;
 }
 }
 
return false;
}

MessageAdd(msg:MessageInterface){
  let url = "http://localhost:5223/SendMessage/";
  return this.http.post<MessageInterface>(url,msg
  )
}
GetMessagesSend(MyId:number,FriendId:number){
  let url = "http://localhost:5223/GetMessagesSend/"+MyId.toString()+"/"+FriendId.toString();
  return this.http.get<MessageInterface[]>(url,
  )
}
getMessagesRecived(MyId:number,FriendId:number){
  let url = "http://localhost:5223/GetMessagesRecived/"+MyId.toString()+"/"+FriendId.toString();
  return this.http.get<MessageInterface[]>(url,
  )
}

OpenChat(MyId:number,FriendId:number)
{
  let url = "http://localhost:5223/OpenChat/"+MyId.toString()+"/"+FriendId.toString();
  return this.http.get<MessageInterface[]>(url,
  )
}
}
