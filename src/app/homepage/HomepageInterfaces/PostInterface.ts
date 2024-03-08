import { CommentInterface } from "./CommentInterface";
import { LikeInterface } from "./LikeInterface";
import { UserInterface } from "./UserInterface";

export interface PostInterface {
    postId:number;
    description:string;
    myimage:string;
    userId: number; 
    creator?:UserInterface;
    likes:LikeInterface[];
    comments:CommentInterface[];
    createdAt:Date;
    updatedAt:Date;
    }