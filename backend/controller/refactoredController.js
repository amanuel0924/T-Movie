// import { createFilterConditionFunction } from "../utils/filterWithfunctions.js"
// import Fuse from "fuse.js"

import { createFilterCondition } from "./../utils/queryGenerators.js"

const createWhereClause = (filters, globalFilter) => {
  let where = {}
  if (globalFilter.value) {
    let global = globalFilter?.columuns?.map((column) => {
      return { [column]: { contains: globalFilter.value, mode: "insensitive" } }
    })
    where.OR = global
  }
  filters.forEach(({ id: column, value, mode, type }) => {
    where = { ...where, ...createFilterCondition(column, value, mode, type) }
  })
  return where
}

export const getAdminData = (table) => async (req, res) => {
  try {
    let { start, size, filters, globalFilter, sorting } = req.query
    start = parseInt(start, 10) || 0
    size = parseInt(size, 10) || 10
    filters = JSON.parse(filters || "[]")
    globalFilter = JSON.parse(globalFilter || "")
    sorting = JSON.parse(sorting || "[]")
    console.log("query", req.query)
    const where = createWhereClause(filters, globalFilter)

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

export const createData = (table) => async (req, res) => {
  const io = req.io
  try {
    const data = await table.create({
      data: {
        ...req.body,
      },
    })
    io.emit("onDataChange")
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const deleteData = (table) => async (req, res) => {
  const io = req.io
  try {
    const { id } = req.params
    await table.delete({
      where: {
        id: parseInt(id),
      },
    })
    io.emit("onDataChange")
    res.json({ message: "Data deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const updateData = (table) => async (req, res) => {
  try {
    const { id } = req.params
    const data = await table.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...req.body,
      },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
export const getDatabyId = (table) => async (req, res) => {
  try {
    const { id } = req.params
    const data = await table.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const togler = (table) => async (req, res) => {
  try {
    const { id } = req.params
    const data = await table.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!data) {
      return res.status(404).json({ error: "data not found" })
    }
    const updatedData = await table.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: !data.status,
      },
    })

    res.json(updatedData)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

export const getUserData = (table) => async (req, res) => {
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

    const count = await table.count({
      where: queryObj,
    })

    const data = await table.findMany({
      where: queryObj,
      take: pageSize,
      skip: pageSize * (page - 1),
    })
    const tolalData = await table.count()

    res.status(200).json({
      page,
      pages: Math.ceil(count / pageSize),
      data,
      tolalData,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}
