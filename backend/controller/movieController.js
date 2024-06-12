import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
import {
  createData,
  deleteData,
  getAdminData,
  getUserData,
  updateData,
  togler,
  getDatabyId,
} from "./refactoredController.js"

export const getMovies = getUserData(prisma.movie)

export const statusTogler = togler(prisma.movie)

export const createMovie = createData(prisma.movie)

export const deleteMovie = deleteData(prisma.movie)

export const updateMovie = updateData(prisma.movie)

export const getMovieById = getDatabyId(prisma.movie)

export const getAdminMovies = getAdminData(prisma.movie)

export const getCategoryMovieCounts = async (req, res) => {
  try {
    const categoryCounts = await prisma.movie.groupBy({
      by: ["categoryId"],
      _count: {
        id: true,
      },
    })

    res.json(categoryCounts)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getTypeMovieCounts = async (req, res) => {
  try {
    const typeCounts = await prisma.movie.groupBy({
      by: ["typeId"],
      _count: {
        id: true,
      },
    })

    res.json(typeCounts)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Something went wrong" })
  }
}
