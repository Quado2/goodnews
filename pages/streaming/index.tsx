import React from "react";
import { useEffect } from "react";

import io from "socket.io-client";

const URL = "http://localhost:5000";

const Streaming = () => {
  let socket: any;
  useEffect(() => {
    socket = io(URL);

    socket.emit("join", { name: "chikwado", role: "King" }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  return <div></div>;
};

export default Streaming;
