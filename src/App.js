import React, { useEffect, useRef, useState } from "react";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";

import { SocketProvider } from "./contexts/SocketProvider";
import { useSocket } from "./contexts/SocketProvider";

import io from "socket.io-client";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [message, setMessage] = useState("Initial message");
  const socketRef = useRef();
  const textRef = useRef();
  const messageRef = useRef();

  const socket = useSocket();

  const submitHandler = (e) => {
    e.preventDefault();
    const newMessage = textRef.current.value;
    console.log(socket, "<----SOCKET");
    socket.emit("title", newMessage);
    return;
  };
  const messageHandler = (e) => {
    e.preventDefault();
    const newMessage = messageRef.current.value;
    socket.emit("groupChat", newMessage);
    console.log("You: ", newMessage);
    return;
  };

  useEffect(() => {
    //   console.log("USEEFFECT RERENDERED");
    //   // socket = io.connect("http://localhost:4000");
    //     // return;
    //   });
    //   // return () => socketRef.current.disconnect();
    // }, []);
    // const newSocket = io.connect("http://localhost:4004");
    // console.log(newSocket);
    // socket.on("title", (message) => {
    //   console.log("CLIENT ", message);
    //   setMessage(message);
    //   // return;
    // });
    // socket.on("message", (message) => {
    //   console.log("CLIENT (message)", message);
    //   // return;
    // });
    // socket.on("groupChat", (message) => {
    //   console.log("Someone else: ", message);
    //   // return;
    // });
    // socket.on("addPlayer", ({ player }) => {
    //   console.log("New Player has joined: ", player.name);
    //   console.log("APP RERENDERED");
    // });
  }, [socket]);

  return (
    <SocketProvider>
      <div className={classesList}>
        {/* <PlayerContainer /> */}
        <h2>{message}</h2>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" ref={textRef} />
          <button type="null" onClick={(e) => submitHandler(e)}>
            send
          </button>
          <input type="text" ref={messageRef} />
          <button type="null" onClick={(e) => messageHandler(e)}>
            message
          </button>
        </form>
        <Table />
        <PlayerContainer />
      </div>
    </SocketProvider>
  );
};

export default App;
