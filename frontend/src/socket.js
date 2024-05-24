import { io } from "socket.io-client"

const socket = io("https://t-movie.onrender.com", {
  withCredentials: true,
})

io.on("connect", (socket) => {
  console.log("front end connected")

  //error handling
  socket.on(" verror", (error) => {
    console.error(error)
  })
})

export default socket
