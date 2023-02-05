import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { Button } from "./components/Button";
import { FullscreenCard } from "./components/FullscreenCard";
import Room from "./components/Room";
import { ChatClient } from "./pages/ChatClient";
import { CreateRoom } from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

export type User = {
  userName: string;
  roomId: string;
};

type Room = {
  roomId: string;
  users: number;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreateRoom, setIsCreateRoom] = useState<boolean>(false);
  const [isJoinRoom, setIsJoinRoom] = useState<boolean>(false);

  useEffect(() => {
    if (user?.userName !== "" && user?.userName != null) {
      setLoggedIn((prev) => !prev);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    socket.on("roomCreated", (newRoom: Room) => {
      setRooms((prev) => [...prev, newRoom]);
    });
    socket.on("roomsUpdate", (newRooms: Room[]) => {
      setRooms(newRooms);
    });
    socket.on("connectToServer", (newRooms: Room[]) => {
      setRooms(newRooms);
    });
  }, [socket]);

  const joinRoom = (roomId: string, userName: string) => {
    socket.emit("joinRoom", roomId);
    setUser({
      userName,
      roomId,
    });
  };

  return (
    <main>
      {!loggedIn ? (
        <FullscreenCard>
          <FullscreenCard.Body>
            <h1 className="text-6xl font-bold text-center mb-6">
              Weclome to Chatify
            </h1>
            <p className="text-2xl text-gray-500 text-center mb-10">
              Start chatting!
            </p>
            {!isCreateRoom && !isJoinRoom && (
              <div className="flex flex-col justify-center items-center">
                <Button
                  className="m-2"
                  onClick={() => {
                    setIsCreateRoom(true);
                    setIsJoinRoom(false);
                  }}
                >
                  Create Room
                </Button>
                <p className="m-2 border-2 border-gray-200 w-2/3"></p>
                <Button
                  /* disabled={rooms.length == 0 ? true : false} */
                  className="m-2"
                  onClick={() => {
                    setIsCreateRoom(false);
                    setIsJoinRoom(true);
                  }}
                >
                  {rooms.length == 0 ? "No Rooms Yet" : "Join Room"}
                </Button>
              </div>
            )}
            {isCreateRoom && <CreateRoom joinRoom={joinRoom} />}
            {isJoinRoom && <JoinRoom rooms={rooms} />}

            {(isCreateRoom || isJoinRoom) && (
              <Button
                className="col-span-full w-full text-2xl mt-2"
                onClick={() => {
                  setIsCreateRoom(false);
                  setIsJoinRoom(false);
                }}
              >
                Back
              </Button>
            )}
          </FullscreenCard.Body>
        </FullscreenCard>
      ) : (
        <ChatClient
          socket={socket}
          roomName={user?.roomId!}
          user={user?.userName!}
          setUser={setUser}
        />
      )}
    </main>
  );
};

export default App;
