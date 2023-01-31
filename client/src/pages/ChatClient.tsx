import { useState } from "react";
import * as io from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { User } from "../App";
import { Button } from "../components/Button";

interface ChatClientProps {
  socket: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomName: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function ChatClient({ socket, roomName, setUser }: ChatClientProps) {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
      setError(false);
      return;
    }
    setError(true);
  };

  return (
    <main>
      <div className="flex justify-start flex-row items-center sticky top-0 bg-gray-900">
        {" "}
        <Button className="m-6 text-lg" onClick={() => setUser(null)}>
          Exit
        </Button>{" "}
        <h1 className="m-6 text-center text-white text-2xl w-[100%]">
          Welcome to <span className="text-blue-600">{roomName}</span> room
        </h1>
      </div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <section className="m-4 h-2/3 w-1/2 border-2 border-blue-400 bg-blue-300 rounded shadow-md">
          Hello
        </section>
      </div>
    </main>
  );
}
