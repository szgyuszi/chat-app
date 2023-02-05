type User = {
  userId: string;
  roomId: string;
};

const usersConnected: User[] = [];

function registerUser(userId: string, roomId: string) {
  usersConnected.push({ userId, roomId });
}

function userDisconnect(userId: string) {
  let i: number;
  for (i = 0; i < usersConnected.length; i++) {
    if (usersConnected[i].userId === userId) {
      usersConnected.splice(i, 1);
    }
  }
}

function getRoomByUserId(userId: string) {
  for (let user of usersConnected) {
    if (user.userId === userId) {
      return user.roomId;
    }
  }

  return "";
}

export const Users = {
  registerUser,
  userDisconnect,
  getRoomByUserId,
};
