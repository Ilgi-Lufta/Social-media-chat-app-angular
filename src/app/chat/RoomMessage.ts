import { UserInterface } from "../homepage/HomepageInterfaces/UserInterface"
import { ChatRoom } from "./ChatRoom"

export interface RoomMessage {
    roomMessageId: number
    messagesSenderId: number
    messagesSender: UserInterface
    chatRoomId: number
    chatRoom: ChatRoom
    message: string
    Date: Date
}