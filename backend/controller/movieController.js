import { PrismaClient } from "@prisma/client"
import { io } from "./../server.js"

const prisma = new PrismaClient()

export const getMovies = async (req, res) => {
  try {
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1
    const queryObj = {}

    if (req.query.keyword) {
      queryObj.title = {
        contains: req.query.keyword,
        mode: "insensitive",
      }
    }
    if (req.query.channel) {
      queryObj.channel = {
        id: Number(req.query.channel),
      }
    }

    if (req.query.type) {
      queryObj.type = {
        id: Number(req.query.type),
      }
    }

    if (req.query.category) {
      queryObj.category = {
        id: Number(req.query.category),
      }
    }

    if (req.query.status) {
      queryObj.status = req.query.status
    }

    const count = await prisma.movie.count({
      where: queryObj,
    })

    const movies = await prisma.movie.findMany({
      where: queryObj,
      take: pageSize,
      skip: pageSize * (page - 1),
    })
    const tolalMovies = await prisma.movie.count()

    res.status(200).json({
      page,
      pages: Math.ceil(count / pageSize),
      movies,
      tolalMovies,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const statusTogler = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" })
    }
    const updatedMovie = await prisma.movie.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: !movie.status,
      },
    })

    res.json(updatedMovie)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const createMovie = async (req, res) => {
  const io = req.io
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
    io.emit("onDataChange")
    res.json(movie)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const deleteMovie = async (req, res) => {
  const io = req.io
  try {
    const { id } = req.params
    await prisma.movie.delete({
      where: {
        id: parseInt(id),
      },
    })
    io.emit("onDataChange")
    res.json({ message: "Movie deleted" })
  } catch (error) {
    console.error(error)
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

// now i want movie  that grouped by category and cout  each movie in catagory
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
