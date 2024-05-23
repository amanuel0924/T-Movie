import session from "express-session"

export const sessionMiddleware = session({
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

export const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next)
