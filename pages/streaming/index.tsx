import React from "react";
import { useEffect } from "react";
import styles from './streaming.module.css';
import Message from "../../components/Message/Message";

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

  return <div className={styles.streaming_wrapper}>
    <Message message="No stream is ongoing now. Streamed event will show here in real time." />
  </div>;
};

export default Streaming;
