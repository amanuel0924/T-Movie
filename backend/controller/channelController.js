import { PrismaClient } from "@prisma/client"
import { getAdminData } from "./refactoredController.js"
const prisma = new PrismaClient()

export const getChannels = async (req, res) => {
  try {
    const queryObj = {}
    if (req.query.keyword) {
      queryObj.name = {
        contains: req.query.keyword,
        mode: "insensitive",
      }
    }
    const channels = await prisma.channel.findMany({
      where: queryObj,
    })
    res.json(channels)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const createChannel = async (req, res) => {
  const io = req.io
  try {
    console.log("createChannel")
    console.log(req.body)

    const { name } = req.body
    const channel = await prisma.channel.create({
      data: {
        name,
      },
    })
    io.emit("onDataChange")
    res.json(channel)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const deleteChannel = async (req, res) => {
  const io = req.io
  try {
    const { id } = req.params
    await prisma.channel.delete({
      where: {
        id: parseInt(id),
      },
    })
    io.emit("onDataChange")
    res.json({ message: "Channel deleted" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateChannel = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" })
    }
    const { name, status } = req.body

    await prisma.channel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        status,
      },
    })
    res.json({ message: "Channel updated" })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    res.json(channel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
export const statusTogler = async (req, res) => {
  try {
    const { id } = req.params
    const channel = await prisma.channel.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!channel) {
      return res.status(404).json({ error: "channel not found" })
    }
    const updatedChanel = await prisma.channel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: !channel.status,
      },
    })

    res.json(updatedChanel)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getAdminChannel = getAdminData(prisma.channel)
//  async (req, res) => {
//   try {
//     let { start, size, filters, globalFilter, sorting } = req.query

//     start = parseInt(start, 10) || 0
//     size = parseInt(size, 10) || 10
//     filters = JSON.parse(filters || "[]")
//     globalFilter = globalFilter || ""
//     sorting = JSON.parse(sorting || "[]")

//     console.log("Filters:", filters)
//     const where = {}
//     if (globalFilter) {
//       where.OR = [{ name: { contains: globalFilter, mode: "insensitive" } }]
//     }

//     //Handle individual filters
//     const supportedOperators = [
//       "equals",
//       "startsWith",
//       "endsWith",
//       "contains",
//       "lessThan",
//       "greaterThan",
//       "lessThanOrEqualTo",
//       "greaterThanOrEqualTo",
//       "between",
//       "fuzzy",
//     ]

//     filters.forEach((filter) => {
//       const { id: column, value, mode: operator } = filter

//       const op = supportedOperators.includes(operator) ? operator : "contains"
//       let parsedValue
//       if (column === "status" && value === "true") {
//         parsedValue = true
//       } else if (column === "status" && value === "false") {
//         parsedValue = false
//       }

//       switch (op) {
//         case "equals":
//           if (column === "status") {
//             where[column] = parsedValue
//           } else {
//             where[column] =
//               column === "id" || column === "duration"
//                 ? Number(value)
//                 : { equals: value, mode: "insensitive" }
//           }
//           break
//         case "startsWith":
//         case "endsWith":
//         case "contains":
//           where[column] = { [op]: value, mode: "insensitive" }
//           break
//         case "lessThan":
//           where[column] = { lt: Number(value) }
//           break
//         case "greaterThan":
//           where[column] = { gt: Number(value) }
//           break
//         case "greaterThanOrEqualTo":
//           where[column] = { gte: Number(value) }
//           break
//         case "lessThanOrEqualTo":
//           where[column] = { lte: Number(value) }
//           break
//         case "between":
//           const [startValue, endValue] = value.map(Number)
//           where[column] = { gt: startValue || 0, lt: endValue || 999999 }
//         default:
//           console.warn(`Unsupported filter operator: ${op}`)
//       }
//     })

//     const orderBy = sorting.map((sort) => ({
//       [sort.id]: sort.desc ? "desc" : "asc",
//     }))

//     const [data, totalRowCount] = await Promise.all([
//       prisma.channel.findMany({
//         where,
//         orderBy,
//         skip: start,
//         take: size,
//       }),
//       prisma.channel.count({ where }),
//     ])

//     res.json({
//       data,
//       meta: {
//         totalRowCount,
//       },
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: "Something went wrong" })
//   }
// }
