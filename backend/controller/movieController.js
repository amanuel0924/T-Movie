import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany()
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      duration,
      description,
      channelId,
      typeId,
      categoryId,
      videoUrl,
    } = req.body
    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        description,
        channelId,
        typeId,
        categoryId,
        videoUrl,
      },
    })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.movie.delete({
      where: {
        id: parseInt(id),
      },
    })
    res.json({ message: "Movie deleted" })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      duration,
      description,
      channelId,
      typeId,
      categoryId,
      videoUrl,
    } = req.body
    const movie = await prisma.movie.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        duration,
        description,
        channelId,
        typeId,
        categoryId,
        videoUrl,
      },
    })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
