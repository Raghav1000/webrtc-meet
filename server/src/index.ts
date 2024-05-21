import { Socket } from "socket.io";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import { UserManager } from "./managers/UserManager";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*" }));

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  userManager.addUser("randomName", socket);
  socket?.on("disconnect", () => {
    console.log("user disconnected");
    userManager?.removeUser(socket?.id);
  });
});

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "GET request received successfully" });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
