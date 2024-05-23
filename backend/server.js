import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import channelRoutes from "./routes/channelRoutes.js"

dotenv.config()
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
})
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/channel", channelRoutes)

io.on("connection", (socket) => {
  console.log("a user connected")
  console.log(socket.request.session)
})

server.listen(4000, () => {
  console.log("listening on port:4000")
})
