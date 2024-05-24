import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany()
    res.json(types)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
