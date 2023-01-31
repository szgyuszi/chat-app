import { config } from "dotenv";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
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
  time: Date;
};

io.on(
  "connection",
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
    console.log(`User connected to ${socket.id}`);

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User: ${socket.id} joined room: ${roomId}`);
    });

    socket.on("sendMessage", (data: MessageDataType) => {
      socket.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected from ${socket.id}`);
    });
  }
);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
