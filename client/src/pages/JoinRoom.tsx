import Room from "../components/Room";

type JoinRoomPropsType = {
  rooms: { roomId: string; users: number }[];
};

const JoinRoom = ({ rooms }: JoinRoomPropsType) => {
  return (
    <div>
      {rooms.length == 0 ? (
        <div className="text-3xl text-center m-4">No rooms Yet...</div>
      ) : (
        rooms.map((room) => {
          return <Room room={room} />;
        })
      )}
    </div>
  );
};

export default JoinRoom;
