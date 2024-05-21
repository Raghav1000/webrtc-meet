import { User } from "./UserManager";
import { v4 as uuidv4 } from "uuid";

interface Room {
  user1: User;
  user2: User;
}
export class RoomManagers {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  generateRoomId() {
    return uuidv4();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generateRoomId();
    this.rooms?.set(roomId, {
      user1,
      user2,
    });
    user1.socket.emit("send-offer", { roomId });
    user2.socket.emit("send-offer", { roomId });
  }

  onOffer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
        return;
    }
    const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;
    receivingUser?.socket.emit("offer", {
        sdp,
        roomId
    })
  }

  onAnswer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
        return;
    }
    const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;

    receivingUser?.socket.emit("answer", {
        sdp,
        roomId
    });
  }

  onIceCandidates(
    roomId: string,
    senderSocketid: string,
    candidate: any,
    type: "sender" | "receiver"
  ) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
    receivingUser.socket.emit("add-ice-candidate", { candidate, type });
  }
}
