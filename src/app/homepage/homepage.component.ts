import { Component, OnInit } from '@angular/core';
import { UserInterface } from './HomepageInterfaces/UserInterface';
import { userService } from './user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from './HomepageInterfaces/RequestInterface';
import { Observable, debounceTime, distinctUntilChanged, from, switchMap, tap } from 'rxjs';
import { PostInterface } from './HomepageInterfaces/PostInterface';
import { LikeInterface } from './HomepageInterfaces/LikeInterface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentInterface } from './HomepageInterfaces/CommentInterface';
import { ChatRoomEdit } from '../chat/ChatRoomEdit';
import { ChatService } from '../chat/chat-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  iLoguari!:UserInterface;
  AllUsers!:UserInterface[];
  AllUsers2!:UserInterface[];
  SearchFriends!:UserInterface[];
  sendRequest!:RequestInterface;
  removefriend!:RequestInterface;
  AllFriends!:RequestInterface[];
  acceptR!:RequestInterface;
  declineR!:RequestInterface;
  requests!:RequestInterface[];
  posts!:PostInterface[];
  like!:LikeInterface;
  unLike!:LikeInterface;
  comment!:CommentInterface
  fileToUpload: File | null = null;
  ilgi:string="6d78d0cd-3d01-478b-99b5-e351cb39271b-Screenshot (4).png"
  

  filterstring: any;
  CommentForm!: FormGroup;
  search!:FormControl;
  chatRoomEdit: ChatRoomEdit=
  {
    name: '',
    membersId: []
  }
  
constructor(private userService1:userService,private router: Router,private chatService:ChatService,private route :ActivatedRoute){}


  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        let id = +params['id'];
        this.GetiLoguari(id);
      this.GetAllUsers(id);
      this.GetAllFriends(id);
      this.GetAllrequests(id);
      this.GetAllPosts(id);

       this.SearchUsers("");
      this.CommentForm = new FormGroup({
        comment: new FormControl('',Validators.required)
      })

   


      this.search = new FormControl([""]);
      
      
      })
      this.search.valueChanges.pipe(
        
        debounceTime(1200),
        distinctUntilChanged()
       
      ).subscribe( serach =>
        {     this.userService1.SearchUsers(serach).subscribe(data=>{
        debugger
        this.SearchFriends=data
      })})
  }

  SendR(id:number){

    this.userService1.SendR(id).subscribe(data=>{
      debugger
      this.sendRequest= data;
      let user = this.AllUsers.find(e=>e.userId === this.sendRequest.reciverId);
      if (user !== undefined) {
     let index= this.AllUsers.indexOf(user);
     if (index > -1) { 
      this.AllUsers.splice(index, 1); 
    }
  }
    },error=>{
      debugger
      console.log(error)
    }

    )
  }
  test(){

    this.AllUsers2 =this.userService1.getAllUsers()

  }
  
  RemoveF(id:number){

    this.userService1.RemoveF(id).subscribe(data=>{
      this.removefriend= data;

      let friend = this.AllFriends.find(e=>e.requestId === this.removefriend.requestId);
      if (friend !== undefined) {
     let index= this.AllFriends.indexOf(friend);
     if (index > -1) { 
      this.AllFriends.splice(index, 1); 
    }
  }


      let userId = this.removefriend.reciverId;
      if(this.removefriend.reciverId === this.iLoguari.userId){
         userId = this.removefriend.senderId;
      }
      this.userService1.getUser(userId).subscribe(data => {
   this.AllUsers.push(data);
      }, error => {
        console.log(error)
      }
      )
      this.AllUsers
      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )
  }

  AcceptR(id:number){

    this.userService1.AcceptR(id).subscribe(data=>{
      this.acceptR= data;
debugger

      let request = this.requests.find(e=>e.requestId === this.acceptR.requestId);
      if (request !== undefined) {
     let index= this.requests.indexOf(request);
     if (index > -1) { 
      this.requests.splice(index, 1);
     }
    }

      this.AllFriends.push(data);
      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )
  }
  
  DeclineR(id:number){
debugger
    this.userService1.DeclineR(id).subscribe(data=>{
      this.declineR= data;

      let request = this.requests.find(e=>e.requestId === this.declineR.requestId);
      if (request !== undefined) {
     let index= this.requests.indexOf(request);
     if (index > -1) { 
      this.requests.splice(index, 1);
     }
    }

      this.requests
      this.userService1.getUser(this.declineR.senderId).subscribe(data => {
        this.AllUsers.push(data);
           }, error => {
             console.log(error)
           }
           )
      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )
  }

  Like(Postid:number){
    this.userService1.Like(Postid).subscribe(data=>{
debugger
      this.like= data;
     
     let Index= this.posts.findIndex(e=>e.postId === Postid);
this.posts[Index].likes.push(this.like)


      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )
  }
  UnLike(Postid:number){
    this.userService1.UnLike(Postid).subscribe(data=>{
      this.unLike= data;

debugger
     
      let Index= this.posts.findIndex(e=>e.postId === Postid);

 let likeindex =this.posts[Index].likes.findIndex(e=>e.LikeId === this.unLike.LikeId);
 this.posts[Index].likes.splice(likeindex,1);

      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )
  }

  SearchUsers(filter:string){
    debugger
    this.userService1.SearchUsers(filter).subscribe(data=>{
      debugger
      this.SearchFriends= data;
    },error=>{
      console.log(error)
    }

    )
  }
  onKey(event: KeyboardEvent) { // without type info
    // event.target.value ;
debugger
this.filterstring= (event.target as HTMLInputElement).value
//const obsfrom =from( (event.target as HTMLInputElement).value)
//debounceTime(500)

    this.userService1.SearchUsers(this.filterstring)
    //   debounceTime(1200),
    //         distinctUntilChanged()
    //       //   tap((data) => {
        
    //       //     this.SearchFriends= data;
    //       // })
    // )
    .subscribe(data=>{
      this.SearchFriends= data;
      debugger
    },error=>{
      debugger
      console.log(error)
    }

    )


  }
  PostLiked(postId:number):boolean{
debugger
   let index =this.posts.findIndex(e=>e.postId===postId);
   debugger
   let like= this.posts[index].likes.find(e=> e.userId === this.iLoguari.userId);
   if (like === undefined)
    return false;
  return true
  }


  onSubmit(form: FormGroup,postId:number) {
debugger
    if(form.valid){
      this.userService1.CommentCreate(form,postId).subscribe(
        data => {
          this.comment = data
          this.CommentForm.reset()
        let index =    this.posts.findIndex(e=>e.postId === postId);
          this.posts[index].comments.push(this.comment);
        }, error => {
          console.log(error)
        }
      )


    }
  }

 GetiLoguari(id:number)
 {
  this.userService1.GetiLoguari(id).subscribe(data => {
    this.iLoguari = data
  }, error => {
    console.log(error)
  }
  )
 }


 onFileSelected(event:any){
debugger
    const file:File = event.target.files[0];

    if (file) {

      //  this.fileName = file.name;

      this.fileToUpload = file;

        debugger


    const formData: FormData = new FormData();
        formData.append('file',this.fileToUpload, this.fileToUpload.name);

  this.userService1.ProfileImage(formData).subscribe(data => {
    debugger
    this.iLoguari = data
  }, error => {
    console.log(error)
  }
  )
 }}
 GetAllUsers(id:number){
   this.userService1.GetAllUsers(id).subscribe(data => {
  this.AllUsers = data
}, error => {
  console.log(error)
}
)
 }
 GetAllFriends(id:number){

   this.userService1.GetAllfriends(id).subscribe(data => {
    this.AllFriends = data
  }, error => {
    console.log(error)
  }
  )
 }
 GetAllrequests(id:number){
   this.userService1.GetAllrequests(id).subscribe(data => {
     debugger
    this.requests = data
  }, error => {
    console.log(error)
  }
  )
 }
 GetAllPosts(id:number){
  
   this.userService1.GetAllPosts(id).subscribe(data => {
    this.posts = data
  }, error => {
    console.log(error)
  }
  )
 }

 GetImage(img:string){
  debugger
  this.userService1.GetImage(img).subscribe(data => {
  let data2 = data
  // return data.name;
 }, error => {
   console.log(error)
 }
 )
}

Logout(){
  this.userService1.Logout();
}
getStorage(user:UserInterface){

  let mylocalStorageData= JSON.parse((localStorage.getItem('data') ||'' ).toString());
}

OpenChat(userId:number)
{
  this.userService1.OpenChat(this.iLoguari.userId,userId);
}



// searchFeture(){
//   debugger
  
//   this.search1.valueChanges.pipe(
//     debounceTime(1200),
//     distinctUntilChanged(),
//     tap(

//       this.userService1.SearchUsers(this.search1.value.search).subscribe(data=>{
//         debugger
//         this.SearchFriends=data
//       })
//     )
//   )
 
  
// }

  createChat(name: string, friendId: number) {
    debugger
    this.chatRoomEdit.membersId.push(this.iLoguari.userId)
    this.chatRoomEdit.membersId.push(friendId)
    if (name !== "") {
      this.chatRoomEdit.name = name
    }
    this.chatService.CreateChat(this.chatRoomEdit).subscribe(data => {
      this.router.navigateByUrl('/chat/' + this.iLoguari.userId + "/" + friendId)
    }
    );

  }

 
 


}
