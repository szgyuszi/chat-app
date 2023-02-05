import { Rooms } from "../util/rooms";
import { Users } from "../util/users";

type CreatedRoom = {
  roomId: string;
  users: number;
};

function onJoinRoom(roomId: string, userId: string) {
  Users.registerUser(userId, roomId);
  const newRoom: CreatedRoom = Rooms.registerRoom(roomId, userId);
  return newRoom;
}

function onDisconnectFromRoom(roomId: string, userId: string) {
  Users.userDisconnect(userId);
  const rooms = Rooms.disconnectFromRoom(roomId, userId);
  return rooms;
}

function onDisconnect(userId: string) {
  const roomId: string = Users.getRoomByUserId(userId);
  const rooms = Rooms.disconnectFromRoom(roomId, userId);
  return rooms;
}

export const Controller = {
  onJoinRoom,
  onDisconnectFromRoom,
  onDisconnect,
};
