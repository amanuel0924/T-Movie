import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server is running")
})

io.on("connection", (socket) => {
  console.log("a user connected")
})

server.listen(4000, () => {
  console.log("listening on port:4000")
})
