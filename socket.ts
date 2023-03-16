import { io } from "socket.io-client";
import { apiUrl } from "./api";

const url = apiUrl; //'http://143.198.122.86:4000'

const socket = io(apiUrl, {
  transports: ["websocket"],
  rejectUnauthorized: false,
});

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

socket.on("connect_error", (error) => {
  console.log(error);
});

export default socket;
