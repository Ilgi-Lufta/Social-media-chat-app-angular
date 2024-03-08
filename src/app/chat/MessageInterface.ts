
import { UserInterface } from "../homepage/HomepageInterfaces/UserInterface";

export interface MessageInterface {
    messageId:number;
    messagesSenderId:number;
    messagesReciverId:number;
    message:string;
    date:Date ;
    messagesReciver:UserInterface;
    messagesSender:UserInterface;
    }