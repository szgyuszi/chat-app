type Room = {
  roomId: string;
  users: string[];
};
const rooms: Room[] = [];

function registerRoom(room: string, userId: string) {
  let i: number;
  for (i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === room) {
      rooms[i].users.push(userId);
      return rooms[i];
    }
  }
  const newRoom: Room = { roomId: room, users: [userId] };
  rooms.push(newRoom);
  return newRoom;
}

function disconnectFromRoom(roomId: string, userId: string) {
  let i: number;
  for (i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === roomId) {
      let index = rooms[i].users.indexOf(userId);
      rooms[i].users.splice(index, 1);
      if (rooms[i].users.length <= 0) {
        rooms.splice(i, 1);
      }
      return rooms;
    }
  }
  return rooms;
}

function getRooms() {
  return rooms;
}

export const Rooms = {
  registerRoom,
  disconnectFromRoom,
  getRooms,
};
