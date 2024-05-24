import { io } from "socket.io-client"

const socket = io("/api", {
  withCredentials: true,
})

export default socket
