import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {  Subject } from 'rxjs';
import { ChatRoomEdit } from './ChatRoomEdit';
import { ChatRoom } from './ChatRoom';
import { RoomMessage } from './RoomMessage';
import { RoomMessageDTO } from './RoomMessageDTO';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private chatMessagesSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  // public startConnection = () => {
  //   debugger
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('/chatHub', {
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets
  //   }) // Replace with your SignalR hub endpoint
  //     .build();

  //   // this.hubConnection.start().then(() => {
  //   //   console.log('SignalR connection started');
  //   // });
  //   this.hubConnection.start().catch(function (e) {
  //   });
  // };

  // public addMessageListener = () => {
  //   this.hubConnection.on('messageReceived', (message: string) => {
  //     // Handle received messages here
  //     this.chatMessagesSubject.next(message);
  //   });
  // };

  // public sendMessage = (message: string) => {
  //   debugger
  //   this.hubConnection.send('SendMessage', message);
  // };

  // public getChatMessagesObservable = () => {
  //   return this.chatMessagesSubject.asObservable();
  // };

  CreateChat(formData:ChatRoomEdit){
    let url = "http://localhost:5223/CreateChat/";
    return this.http.post<ChatRoom>(url,formData
    )
  }
  GetChats(MyId:number){
    let url = "http://localhost:5223/GetChats/"+MyId.toString();
    return this.http.get<ChatRoom[]>(url
    )
  }
  GetChat(MyId:number){
    let url = "http://localhost:5223/GetChat/"+MyId.toString();
    return this.http.get<ChatRoom>(url
    )
  }
  
  GetRoomMessage(chatId:number){
    let url = "http://localhost:5223/GetRoomMesage/"+chatId.toString();
    return this.http.get<RoomMessage[]>(url
    )
  }
  SendRoomMessage(roomMessageDTO:RoomMessageDTO){
    let url = "http://localhost:5223/SendRoomMesage/";
    return this.http.post<RoomMessage>(url,roomMessageDTO
    )
  }


}