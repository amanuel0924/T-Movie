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
    console.log(globalFilter)
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

// export const getAdminDataByFilter = (table) => async (req, res) => {
//   try {
//     // Parse query parameters with proper error handling
//     let { start, size, filters, globalFilter, sorting } = req.query
//     start = parseInt(start, 10) || 0
//     size = parseInt(size, 10) || 10
//     if (isNaN(start) || isNaN(size)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid start or size parameters" })
//     }
//     filters = JSON.parse(filters || "[]")
//     globalFilter = globalFilter || ""
//     sorting = JSON.parse(sorting || "[]")

//     // Validate sorting criteria (optional)
//     if (
//       !Array.isArray(sorting) ||
//       sorting.some((sort) => !sort.id || typeof sort.desc !== "boolean")
//     ) {
//       return res.status(400).json({ message: "Invalid sorting criteria" })
//     }

//     // Apply in-memory filtering (optional)
//     let filteredData = await table.findMany() // Fetch all data initially
//     console.log("filteredData", filters)
//     if (filters.length > 0) {
//       filteredData = filteredData.filter((row) => {
//         for (const filter of filters) {
//           const { id, value, mode, variant, type } = filter
//           let match = false

//           switch (variant) {
//             case "text":
//               if (mode === "startsWith") {
//                 match = startsWith(row, id, value)
//               } else if (mode === "contains") {
//                 match = contains(row, id, value)
//               } else if (mode === "endsWith") {
//                 match = endsWith(row, id, value)
//               } else if (mode === "fuzzy") {
//                 match = fuzzy()
//               } else if (mode === "equals") {
//                 match = equals(row, id, value, type)
//               } else if (mode === "notEquals") {
//                 match = notEquals(row, id, value, type)
//               } else if (mode === "lessThan") {
//                 match = lessThan(row, id, value, type)
//               } else if (mode === "greaterThan") {
//                 match = greaterThan(row, id, value, type)
//               } else if (mode === "lessThanOrEqualTo") {
//                 match = lessThanOrEqualTo(row, id, value, type)
//               } else if (mode === "greaterThanOrEqualTo") {
//                 match = greaterThanOrEqualTo(row, id, value, type)
//               } else if (mode === "between") {
//                 match = between(row, id, value, type)
//               } else if (mode === "betweenInclusive") {
//                 match = betweenInclusive(row, id, value, type)
//               } else if (mode === "empty") {
//                 match = row[id] === null || row[id] === ""
//               } else if (mode === "notEmpty") {
//                 match = row[id] !== null && row[id] !== ""
//               } else {
//                 console.warn(`Unsupported text filter mode: ${mode}`)
//               }
//               break
//             case "date":
//             case "datetime":
//             case "time":
//               if (mode === "equals") {
//                 match = equals(row, id, value, type)
//               } else if (mode === "notEquals") {
//                 match = notEquals(row, id, value, type)
//               } else if (mode === "lessThan") {
//                 match = lessThan(row, id, value, type)
//               } else if (mode === "greaterThan") {
//                 match = greaterThan(row, id, value, type)
//               } else if (mode === "lessThanOrEqualTo") {
//                 match = lessThanOrEqualTo(row, id, value, type)
//               } else if (mode === "greaterThanOrEqualTo") {
//                 match = greaterThanOrEqualTo(row, id, value, type)
//               } else if (mode === "between") {
//                 match = between(row, id, value, type)
//               } else if (mode === "betweenInclusive") {
//                 match = betweenInclusive(row, id, value, type)
//               } else if (mode === "empty") {
//                 match = row[id] === null || row[id] === ""
//               } else if (mode === "notEmpty") {
//                 match = row[id] !== null && row[id] !== ""
//               } else {
//                 console.warn(`Unsupported text filter mode: ${mode}`)
//               }
//             case "select":
//               if (mode === "equals") {
//                 match = equals(row, id, value, type)
//               } else if (mode === "notEquals") {
//                 match = notEquals(row, id, value, type)
//               } else if (mode === "lessThan") {
//                 match = lessThan(row, id, value, type)
//               } else if (mode === "greaterThan") {
//                 match = greaterThan(row, id, value, type)
//               } else if (mode === "lessThanOrEqualTo") {
//                 match = lessThanOrEqualTo(row, id, value, type)
//               } else if (mode === "greaterThanOrEqualTo") {
//                 match = greaterThanOrEqualTo(row, id, value, type)
//               }
//               break
//             case "multiSelect":
//               match = value.includes(row[id])
//               break
//             case "range":
//             case "range-slider":
//             case "time-range":
//             case "date-range":
//             case "dateTime-range":
//               if (mode === "between") {
//                 match = between(row, id, value, type)
//               } else if (mode === "betweenInclusive") {
//                 match = betweenInclusive(row, id, value, type)
//               }
//               break
//             case "checkbox":
//               match = equals(row, id, value, type)
//             default:
//               console.warn(`Unsupported filter variant: ${variant}`)
//           }

//           if (!match) return false // Early termination if filter doesn't match
//         }
//         return true
//       })
//     }

//     // Apply in-memory sorting
//     filteredData.sort((a, b) => {
//       for (const sort of sorting) {
//         const { id, desc } = sort
//         const compareValue = a[id] - b[id]
//         const sortOrder = desc ? -1 : 1
//         if (compareValue !== 0) return compareValue * sortOrder
//       }
//       return 0 // No sorting difference found based on provided criteria
//     })

//     // Apply pagination (slice the filtered data)
//     const paginatedData = filteredData.slice(start, start + size)

//     res.json({
//       data: paginatedData,
//       meta: {
//         totalRowCount: filteredData.length,
//       },
//     }) // Include total count
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "Internal server error" })
//   }
// }
