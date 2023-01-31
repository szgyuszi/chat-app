import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { FSCard } from "./components/FSCard";
import { ChatClient } from "./pages/ChatClient";
import { Login } from "./pages/Login";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

export type User = {
  userName: string;
  roomId: string;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn((prev) => !prev);
  }, [user]);

  return (
    <main>
      {!loggedIn ? (
        <FSCard>
          <FSCard.Body>
            <Login socket={socket} user={user} setUser={setUser} />
          </FSCard.Body>
        </FSCard>
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
