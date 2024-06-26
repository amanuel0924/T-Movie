import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import authRoutes from "./routes/authRoutes.js"
import channelRoutes from "./routes/channelRoutes.js"
import movieRoutes from "./routes/movieRoute.js"
import typeCategory from "./routes/TypeAndCategory.js"

dotenv.config()
import { Server } from "socket.io"
// const __dirname = path.resolve()
const app = express()
const server = http.createServer(app)
const allowedOrigins = [
  "https://frontend-delta-self-97.vercel.app",
  "http://localhost:5173",
]
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  },
})

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use(
  "/api/channel",
  (req, res, next) => {
    req.io = io
    next()
  },
  channelRoutes
)
app.use(
  "/api/movie",
  (req, res, next) => {
    req.io = io
    next()
  },
  movieRoutes
)
app.use("/api/typeandcategory", typeCategory)

io.on("connect", (socket) => {
  console.log("a user connected")

  socket.on("datachange", (data) => {
    io.emit("onDataChange")
  })
})

export { io }
server.listen(4000, () => {
  console.log("listening on port:4000")
})
