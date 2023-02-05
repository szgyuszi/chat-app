import { config } from "dotenv";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Controller } from "./controller/SocketController";
config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

type MessageDataType = {
  roomId: string;
  author: string;
  message: string;
  time: string;
};

io.on(
  "connection",
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      const newRoom = Controller.onJoinRoom(roomId, socket.id);
      socket.broadcast.emit("roomCreated", newRoom);
    });

    socket.on("sendMessage", (data: MessageDataType) => {
      socket.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("disconnectFromRoom", (roomId: string) => {
      const rooms = Controller.onDisconnectFromRoom(roomId, socket.id);
      socket.broadcast.emit("roomsUpdate", rooms);
    });

    socket.on("disconnect", () => {
      const rooms = Controller.onDisconnect(socket.id);
      socket.broadcast.emit("roomsUpdate", rooms);
    });
  }
);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
