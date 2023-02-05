import { FormEvent, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

interface CreateRoomProps {
  joinRoom: (roomId: string, userName: string) => void;
}

export function CreateRoom({ joinRoom }: CreateRoomProps) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      userNameRef.current?.value !== "" &&
      roomNameRef.current?.value !== ""
    ) {
      setIsError(false);
      joinRoom(roomNameRef.current?.value!, userNameRef.current?.value!);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
        onSubmit={handleSubmit}
      >
        <label className="text-2xl" htmlFor="userName">
          Username
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
        <label className="text-2xl" htmlFor="room">
          Room Name
        </label>
        <Input
          id="room"
          placeholder="Enter Room Name"
          ref={roomNameRef}
          className={"text-gray-700 text-2xl"}
          pattern="\S*"
        />

        <Button type="submit" className="col-span-full w-full text-2xl">
          Create Room
        </Button>
      </form>
    </>
  );
}
