import { FormEvent, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { User } from "../App";
import { Button } from "../components/Button";
import { ChatBox } from "../components/ChatBox";
import { Input } from "../components/Input";
import { FaPaperPlane } from "react-icons/fa";
import Message from "../components/Message";

interface ChatClientProps {
  socket: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomName: string;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type MessageDataType = {
  roomId: string;
  author: string;
  message: string;
  time: string;
};

export function ChatClient({
  socket,
  roomName,
  user,
  setUser,
}: ChatClientProps) {
  const [messageList, setMessageList] = useState<MessageDataType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        roomId: roomName,
        author: user,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data: MessageDataType) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const handleExitRoom = () => {
    setUser(null);
    socket.emit("disconnectFromRoom", roomName);
  };

  return (
    <main>
      <section className="flex justify-start flex-row items-center sticky top-0 bg-gray-900">
        <Button className="m-6 text-lg" onClick={handleExitRoom}>
          Exit
        </Button>
        <h1 className="m-8 text-center text-white text-4xl w-[100%]">
          Joined room: <span className="text-blue-400">{" " + roomName}</span>
        </h1>
      </section>
      <section className="m-16 h-1/2 flex justify-center items-center flex-col">
        <ChatBox>
          <ChatBox.Header>
            <h1 className="m-2">Messages</h1>
          </ChatBox.Header>
          <ChatBox.Body>
            <div>
              {messageList.map((msg) => {
                return (
                  <Message
                    key={`${msg.time + Math.random()}`}
                    message={msg.message}
                    author={msg.author}
                    time={msg.time}
                    isCurrentUser={msg.author === user ? true : false}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ChatBox.Body>

          <ChatBox.Footer>
            <form onSubmit={sendMessage} className="flex flex-row w-full">
              <Input
                value={message}
                type="text"
                placeholder="Send Message!"
                onChange={handleInputChange}
                className="mr-2 h-12"
              />
              <Button
                className="w-20 h-12 flex items-center justify-center"
                type="submit"
              >
                <FaPaperPlane />
              </Button>
            </form>
          </ChatBox.Footer>
        </ChatBox>
      </section>
    </main>
  );
}
