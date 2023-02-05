type RoomPropsType = {
  room: {
    roomId: string;
    users: number;
  };
};

const Room = ({ room }: RoomPropsType) => {
  return (
    <div key={room.roomId}>
      {room.roomId} : {room.users}
    </div>
  );
};

export default Room;
