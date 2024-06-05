import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getMovies = async (req, res) => {
  try {
    const pageSize = 5
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

export const getAdminMovies = async (req, res) => {
  try {
    let { start, size, filters, globalFilter, sorting } = req.query

    start = parseInt(start, 10) || 0
    size = parseInt(size, 10) || 10
    filters = JSON.parse(filters || "[]")
    globalFilter = globalFilter || ""
    sorting = JSON.parse(sorting || "[]")

    console.log("Filters:", filters)
    const where = {}
    if (globalFilter) {
      where.OR = [
        { title: { contains: globalFilter, mode: "insensitive" } },
        { description: { contains: globalFilter, mode: "insensitive" } },
      ]
    }

    //Handle individual filters
    const supportedOperators = [
      "equals",
      "startsWith",
      "endsWith",
      "contains",
      "lessThan",
      "greaterThan",
      "lessThanOrEqualTo",
      "greaterThanOrEqualTo",
      "between",
      "fuzzy",
    ]

    filters.forEach((filter) => {
      const { id: column, value, mode: operator } = filter

      const op = supportedOperators.includes(operator) ? operator : "contains"
      let parsedValue
      if (column === "status" && value === "true") {
        parsedValue = true
      } else if (column === "status" && value === "false") {
        parsedValue = false
      }

      switch (op) {
        case "equals":
          where[column] =
            column === "id" || column === "duration"
              ? Number(value)
              : { equals: value, mode: "insensitive" }
          break
        case "startsWith":
        case "endsWith":
        case "contains":
          if (column === "id") {
            where[column] = Number(value)
          } else if (column === "status") {
            where[column] = parsedValue
          } else {
            where[column] = { [op]: value, mode: "insensitive" }
          }
          break
        case "lessThan":
          if (column === "duration") {
            where[column] = { lt: Number(value) }
          } else {
            where[column] = { lt: Number(value) }
          }
          break
        case "greaterThan":
          if (column === "duration") {
            where[column] = { gt: Number(value) }
          } else {
            where[column] = { gt: Number(value) }
          }
          break
        case "greaterThanOrEqualTo":
          where[column] = { gte: Number(value) }
          break
        case "lessThanOrEqualTo":
          where[column] = { lte: Number(value) }
          break
        case "between":
          if (typeof value === "string") {
            const [startValue, endValue] = value.split(",").map(Number)
            if (!isNaN(startValue) && !isNaN(endValue)) {
              where[column] = { gt: startValue, lt: endValue }
            } else {
              console.warn(`Invalid 'between' filter value: ${value}`)
            }
          }
        default:
          console.warn(`Unsupported filter operator: ${op}`)
      }
    })

    const orderBy = sorting.map((sort) => ({
      [sort.id]: sort.desc ? "desc" : "asc",
    }))

    const [data, totalRowCount] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy,
        skip: start,
        take: size,
      }),
      prisma.movie.count({ where }),
    ])

    res.json({
      data,
      meta: {
        totalRowCount,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}
