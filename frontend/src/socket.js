import { io } from "socket.io-client"

const socket = io("https://t-movie.onrender.com", {
  withCredentials: true,
})

export default socket
