// const express = require("express");
// const socketio = require("socket.io");
// const http = require("http");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// // Set static folder
// // app.use(express.static(path.join(__dirname, "../public/index.html")));

// const whitelist = ["http://localhost:3001"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // app.use(cors());

// // io.on("connection", (socket) => {
// //   console.log(socket);
// //   socket.on("message", (message) => {
// //     console.log(message);
// //   });
// // });

// // Run when a client connects
// io.on("connection", (socket) => {
//   console.log("New WS Connection...");
// });

// const PORT = 4000 || process.env.PORT;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

////////////////////////////////////////////////////////////////

const app = require("express")();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New User connected");

  // Just to 1 user
  socket.emit("message", `[SERVER] You have connected`);

  socket.emit("message", socket.handshake.query.t);

  // To everyone but 1 user
  console.log("[SERVER] A user has joined");
  socket.broadcast.emit(
    "message",
    `[SERVER] A user has joined: ${socket.handshake.query.t}`
  );

  socket.on("disconnect", () => {
    // To everyone
    io.emit("message", "[SERVER] A user has left the chat");
  });

  socket.on("message", (message) => {
    // when receiving message, emits message to everyone
    io.emit("message", message);
    console.log(message);
  });

  socket.on("groupChat", (message) => {
    socket.broadcast.emit("groupChat", message);
  });

  socket.on("addPlayer", (player) => {
    io.emit("addPlayer", player);
  });

  socket.on("readyPlayer", (player) => {
    io.emit("readyPlayer", player);
  });

  socket.on("title", (message) => {
    // when receiving title, emits title to everyone
    io.emit("title", message);
  });
});

// io.on("message", (message) => {
//   console.log(message);
// });

server.listen(4000, function () {
  console.log("listening on port 4000");
});
