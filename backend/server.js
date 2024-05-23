import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"

import authRoutes from "./routes/authRoutes.js"
import channelRoutes from "./routes/channelRoutes.js"
import movieRoutes from "./routes/movieRoute.js"

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
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use("/api/channel", channelRoutes)
app.use("/api/movie", movieRoutes)

io.on("connect", (socket) => {
  console.log("a user connected")
  io.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

server.listen(4000, () => {
  console.log("listening on port:4000")
})
