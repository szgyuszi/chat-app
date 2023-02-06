import { FaUserAlt } from "react-icons/fa";

type RoomPropsType = {
  room: {
    roomId: string;
    users: string[];
  };
};

const Room = ({ room }: RoomPropsType) => {
  console.log(room);

  return (
    <div
      className="flex flex-row justify-evenly items-center p-4"
      key={room.roomId}
    >
      <div className="h-4 w-4 bg-green-500 border-2 border-green-100 rounded-full mr-2"></div>
      <p className="mr-6 text-xl">{room.roomId}</p>
      <div className="flex flex-row justify-evenly items-center">
        <FaUserAlt className="mr-2 text-gray-600" />
        <p>{room.users.length}</p>
      </div>
    </div>
  );
};

export default Room;
