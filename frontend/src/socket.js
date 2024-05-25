import { io } from "socket.io-client"

export const baseURL = "https://t-movie.onrender.com"

const socket = io(baseURL, {
  withCredentials: true,
})

export default socket
