function formatDuration(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / 60000)

  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return `${hours}h ${remainingMinutes}m`
}

export { formatDuration }

export const mergeFilterfn = (columnFilters, columnFilterFns) => {
  return columnFilters.map((item) => {
    if (item.id in columnFilterFns) {
      return { ...item, mode: columnFilterFns[item.id] }
    }
    return item
  })
}

export const mergeFiterVariant = (columnFilters, clomunVariants) => {
  return columnFilters.map((item) => {
    if (item.id in clomunVariants) {
      return { ...item, variant: clomunVariants[item.id] }
    }
    return item
  })
}

export const mergeFilterDatatype = (columnFilters, columnDataTypes) => {
  return columnFilters.map((item) => {
    if (item.id in columnDataTypes) {
      return { ...item, type: columnDataTypes[item.id] }
    }
    console.log(item)
    return item
  })
}

export const numberDateTimeModes = [
  "equals",
  "notEquals",
  "lessThan",
  "lessThanOrEqualTo",
  "greaterThan",
  "greaterThanOrEqualTo",
  "between",
  "betweenInclusive",
  "empty",
  "notEmpty",
]
export const checkboxModes = ["equals"]
export const selectModes = [
  "equals",
  "notEquals",
  "lessThan",
  "lessThanOrEqualTo",
  "greaterThan",
  "greaterThanOrEqualTo",
  "empty",
  "notEmpty",
]
export const multiSelectModes = ["equals", "notEquals"]
export const ranges = ["between", "betweenInclusive"]
