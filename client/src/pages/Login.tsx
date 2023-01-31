import { FormEvent, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import * as io from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type User = {
  userName: string;
  roomId: string;
};

interface LoginProps {
  socket: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function Login({ socket, user, setUser }: LoginProps) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(userNameRef.current?.value);
    console.log(roomNameRef.current?.value);

    if (userNameRef.current?.value && roomNameRef.current?.value) {
      socket.emit("joinRoom", roomNameRef.current?.value);
      setIsError(false);
      setUser({
        userName: userNameRef.current?.value,
        roomId: roomNameRef.current?.value,
      });
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">
        Weclome to Chatify
      </h1>
      <p className="text-xl text-gray-500 text-center mb-6">Start chatting!</p>
      <form
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
        onSubmit={handleSubmit}
      >
        <label htmlFor="userName">Username</label>
        <Input
          id="userName"
          pattern="\S*"
          placeholder="Username"
          ref={userNameRef}
          required
          autoFocus
        />
        <label htmlFor="room">Room Name</label>
        <Input
          id="room"
          placeholder="Enter Room Name"
          ref={roomNameRef}
          className={"text-gray-700"}
          pattern="\S*"
        />

        <Button type="submit" className="col-span-full w-full ">
          Enter Room
        </Button>
      </form>
    </>
  );
}
