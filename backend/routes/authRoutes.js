import express from "express"
import { validate, loginSchema } from "../middleware/validationMiddleware.js"
import { PrismaClient } from "@prisma/client"

const router = express.Router()

router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body
    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    })
    if (user) {
      req.session.userId = user.id
      res.json({ message: "Logged in" })
    } else {
      res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
})

export default router
