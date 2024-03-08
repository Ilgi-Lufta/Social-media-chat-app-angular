import { PostInterface } from "./PostInterface";
import { UserInterface } from "./UserInterface";

export interface LikeInterface {
    LikeId:number;
    userId: number; 
    postId: number;
    UseriQePelqen?:UserInterface;
    PostiQePelqehet?:PostInterface;
    }