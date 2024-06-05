import { io } from "socket.io-client"

// export const baseURL = "https://t-movie.onrender.com"
export const baseURL = "http://localhost:4000"

const socket = io(baseURL, {
  withCredentials: true,
})

export default socket
