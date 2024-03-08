import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat-service.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userService } from '../homepage/user-service.service';
import { MessageInterface } from './MessageInterface';
import { UserInterface } from '../homepage/HomepageInterfaces/UserInterface';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomEdit } from './ChatRoomEdit';
import { ChatRoom } from './ChatRoom';
import { RoomMessage } from './RoomMessage';
import { RoomMessageDTO } from './RoomMessageDTO';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
   private connection!: HubConnection;
  public messages: string[] = [];
  public messages2: string[] = [];
  public user: string = "";
  public message: string = "";
  msgSender!:UserInterface;
  msgsReciver!:UserInterface;
  msg :MessageInterface= {
    message: '',
    messageId: 0,
    messagesSenderId: 0,
    messagesReciverId: 0,
    date: new Date(),
    messagesReciver: this.msgSender,
    messagesSender: this.msgsReciver
  };
  SendMessages: MessageInterface[] = [];
  RecivedMessages: MessageInterface[] = [];
  iLoguari!:UserInterface;
  friend:number=0;
  myForm!: FormGroup;
  myForm2!:FormGroup;
  connectionId!: string;
  chatRoomEdit: ChatRoomEdit=
  {
    name: '',
    membersId: []
  }
  myChats!:ChatRoom[];

  myChat!:ChatRoom;
  myChatRoom!:RoomMessage[];
  sendRoomMessage!:RoomMessage;


  roomMessage: RoomMessageDTO=
  {
    ChatRoomId: 0,
    MessagesSenderId: 0,
    Message:""
  }
  
  constructor(private userService1 :userService,private chatService:ChatService,private route:ActivatedRoute) {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5223/chat')
      .build();
  }

  async ngOnInit() {
    


    this.myForm = new FormGroup({
      message: new FormControl<string>("",[Validators.required]),
    });
    this.myForm2 = new FormGroup({
      message2: new FormControl<string>("",[Validators.required]),
    });


    this.connection.on('ReceiveMessage', (user, message) => {
      this.messages.push(`${user}: ${message}`);
    });
    this.connection.on('ReceiveMessage2', (message:MessageInterface) => {
      this.SendMessages.push(message);
    });
    this.connection.on('Send', (message:string) => {
      debugger

    });



    this.connection.on('ReciveGroupMessage', ( message:RoomMessage) => {
      debugger
      this.myChatRoom.push(message);
    });

    try {
      await this.connection.start()
      .then(

        () => this.getConnectionId())
        ;
      console.log('Connected to SignalR hub');
    } catch (error) {
      console.error('Failed to connect to SignalR hub', error);
    }



    this.route.params
    .subscribe(params => {
      let id = +params['id'];
      this.friend = +params['reciverId'];
      this.GetiLoguari(id);
      this.userService1.GetMessagesSend(id,this.friend).subscribe(
        data=>{
         this.SendMessages=data;
      })

      this.GetChats(id);
     // this.GetChat(id);
    })
    



  }

  onSubmit2(form: FormGroup) {
    if(form.value.message==="")
      return
    
    this.msg.message = form.value.message;
    this.msg.messagesSenderId = this.iLoguari.userId;
    this.msg.messagesReciverId = this.friend;
    this.msg.date = new Date();
    this.sendMessage(this.msg)
 this.userService1.MessageAdd(this.msg).subscribe(data => {
  this.SendMessages.push(data)
  this.myForm.reset();
 
 }, error => {
 console.log(error)
 }
 )
 
   }
 
  GetiLoguari(id:number){
  this.userService1.GetiLoguari(id).subscribe(data => {
    this.iLoguari = data
  }, error => {
    console.log(error)
  }
  )}

  async onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('projectStatus', form.value.projectStatus);
    // console.log(form); // true or false


    

    await this.connection.invoke('SendMessage2',form.value.message);



  }

  async sendMessage(msg:MessageInterface) {
    
    await this.connection.invoke('SendMessage2', msg,this.connectionId,);
   
    
  }


  private getConnectionId = () => {
    debugger
    this.connection.invoke('GetConnectionId')
    .then((data) => {
      debugger
      console.log(data);
      this.connectionId = data;
    });
  }

createChat(name:string,friendId:number){
  this.chatRoomEdit.membersId.push(this.iLoguari.userId)
  this.chatRoomEdit.membersId.push(friendId)
  if(name!==""){
    this.chatRoomEdit.name=name
  }
  this.chatService.CreateChat(this.chatRoomEdit);
}
GetChats(MyId:number){
 
  this.chatService.GetChats(MyId).subscribe(async data=>{
    debugger
this.myChats = data
 for (let index = 0; index < data.length; index++) {
  data[index]
  await this.connection.invoke('AddToGroup',data[index].chatRoomId.toString() );
  debugger
 }

  });
}
GetChat(MyId:number){
 
  this.chatService.GetChat(MyId).subscribe(data=>{
    this.myChat = data
      });;
}
GetRoomMessage(chatId:number){
 
  this.chatService.GetRoomMessage(chatId).subscribe(data=>{
    this.myChatRoom = data
      });
      this.GetChat(chatId);
}
SendRoomMesage(ChatRoomId:number,SenderId:number,message:string){

  this.roomMessage.ChatRoomId= ChatRoomId;
  this.roomMessage.MessagesSenderId=SenderId;
  this.roomMessage.Message=message;
  debugger
  this.chatService.SendRoomMessage(this.roomMessage).subscribe(async data=>{
  debugger

    await this.connection.invoke('MessageGroup',data);
  debugger

    // this.myChatRoom.push(data);
      });;
}
FormSubmit(form: FormGroup) {
  debugger
  if(form.value.message2==="" ||form.value.message2 === undefined )
    return
  debugger
  this.msg.message = form.value.message;
  this.msg.messagesSenderId = this.iLoguari.userId;

  this.SendRoomMesage(this.myChat.chatRoomId,this.iLoguari.userId,form.value.message2)

this.myForm2.reset();




 }

}