import { CommentInterface } from "./CommentInterface";
import { LikeInterface } from "./LikeInterface";
import { PostInterface } from "./PostInterface";
import { RequestInterface } from "./RequestInterface";

export interface UserInterface {
    userId:number;
    firstName: string; 
    lastName: string;
    userName:string;
    password: string;
    createdAt:Date;
    updatedAt:Date;
    readonlyequestsReciver:RequestInterface;
    requestsSender:RequestInterface;
    likes:LikeInterface;
    comments:CommentInterface;
    createdPost:PostInterface;
    myimage:string;
    token:string;
    expiresIn: Date;

    }