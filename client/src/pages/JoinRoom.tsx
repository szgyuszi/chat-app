import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import Room from "../components/Room";

type JoinRoomPropsType = {
  rooms: { roomId: string; users: string[] }[];
  joinRoom: (roomId: string, userName: string) => void;
};

const JoinRoom = ({ rooms, joinRoom }: JoinRoomPropsType) => {
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleJoinRoom = (roomId: string) => {
    if (userNameRef.current?.value !== "") {
      joinRoom(roomId, userNameRef.current?.value!);
    }
  };

  return (
    <div>
      {rooms.length == 0 ? (
        <div className="text-3xl text-center m-4">No rooms Yet...</div>
      ) : (
        <section>
          <div className="mb-4 grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end">
            <label className="text-2xl" htmlFor="userName">
              Username:
            </label>
            <Input
              id="userName"
              pattern="\S*"
              placeholder="Username"
              ref={userNameRef}
              required
              autoFocus
              className="text-2xl"
            />
          </div>
          {rooms.map((room) => {
            return (
              <div
                key={Math.random()}
                className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 mb-2 items-center justify-items-end  p-2 rounded shadow hover:shadow-xl transition-all"
              >
                <Room room={room} />
                <Button onClick={() => handleJoinRoom(room.roomId)}>
                  Join
                </Button>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default JoinRoom;
