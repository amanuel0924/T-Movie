import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
import {
  handleBooleanFilter,
  handleNumberFilter,
  handleTextFilter,
} from "../utils/queryGenerators.js"

export const getAdminData = (table) => async (req, res) => {
  try {
    let { start, size, filters, globalFilter, sorting } = req.query

    start = parseInt(start, 10) || 0
    size = parseInt(size, 10) || 10
    filters = JSON.parse(filters || "[]")
    globalFilter = globalFilter || ""
    sorting = JSON.parse(sorting || "[]")
    console.log("start", filters)
    let where = {}

    if (globalFilter) {
      where.OR = [
        { title: { contains: globalFilter, mode: "insensitive" } },
        { description: { contains: globalFilter, mode: "insensitive" } },
      ]
    }

    const variants = [
      "number",
      "text",
      "date",
      "datetime",
      "time",
      "dateRange",
      "timeRange",
      "dateTimeRange",
      "select",
      "multiSelect",
      "checkbox",
    ]

    filters.forEach((filter) => {
      const { id: column, value, mode: op, variant } = filter

      switch (variant) {
        case "text":
          where = { ...where, ...handleTextFilter(column, value, op) }
          break
        case "number":
          where = { ...where, ...handleNumberFilter(column, value, op) }
          break
        case "checkbox":
          where = { ...where, ...handleBooleanFilter(column, value) }
          break
        case "select":
          where[column] = { equals: value }
          break
        case "multiSelect":
          where[column] = { in: value }
          break
        case "date":
        case "datetime":
        case "time":
          where[column] = { [op]: new Date(value) }
          break
        case "dateRange":
        case "timeRange":
        case "dateTimeRange":
          const [startValue, endValue] = value
          where[column] = { gte: new Date(startValue), lte: new Date(endValue) }
          break
        default:
          console.warn(`Unsupported filter operator: ${op}`)
      }
    })
    const orderBy = sorting.map((sort) => ({
      [sort.id]: sort.desc ? "desc" : "asc",
    }))

    const [data, totalRowCount] = await Promise.all([
      table.findMany({
        where,
        orderBy,
        skip: start,
        take: size,
      }),
      table.count({ where }),
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
