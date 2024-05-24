import express from "express"

import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/login", async (req, res) => {
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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      res.json({ message: "Logged in" })
    } else {
      res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token")
    res.json({ message: "Logged out" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

export default router
