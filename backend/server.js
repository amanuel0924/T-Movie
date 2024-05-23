import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import session from "express-session"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const prisma = new PrismaClient()
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
})
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    credentials: true,
    name: "sid",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
)

app.use("/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("Server is running")
})

io.on("connection", (socket) => {
  console.log("a user connected")
})

server.listen(4000, () => {
  console.log("listening on port:4000")
})
