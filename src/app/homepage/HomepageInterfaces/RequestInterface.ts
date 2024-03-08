import { UserInterface } from "./UserInterface";

export interface RequestInterface {
    requestId:number;
    accepted: boolean; 
    senderId: number;
    sender?:UserInterface;
    reciverId:number;
    reciver?:UserInterface;
    createdAt:Date;
    updatedAt:Date;


    }