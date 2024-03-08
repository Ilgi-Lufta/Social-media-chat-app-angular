import { PostInterface } from "./PostInterface";
import { UserInterface } from "./UserInterface";

export interface CommentInterface {
    commentId:number;
    content:string;
    userId: number; 
    postId: number;
    useriQekomenton?:UserInterface;
    postiQekomentohet?:PostInterface;
    }