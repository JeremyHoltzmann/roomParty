import socketIOClient from "socket.io-client";

export default function (
  socket = socketIOClient("http://192.168.10.127:3000"),
  action
) {
  return socket;
}
