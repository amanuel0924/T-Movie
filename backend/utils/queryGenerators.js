const numberAndDateOperators = [
  "equals",
  "lessThan",
  "greaterThan",
  "lessThanOrEqualTo",
  "greaterThanOrEqualTo",
  "between",
  "notEquals",
  "betweenInclusive",
]
const textOperators = [
  "equals",
  "startsWith",
  "endsWith",
  "contains",
  "notEquals",
  "fuzzy",
]

export const handleBooleanFilter = (column, value) => {
  let parsedValue
  if (value === "true") {
    parsedValue = true
  } else if (value === "false") {
    parsedValue = false
  }
  return { [column]: { equals: parsedValue } }
}

export const handleNumberFilter = (column, value, op) => {
  if (numberAndDateOperators.includes(op)) {
    const numericValue = Array.isArray(value)
      ? value.map(Number)
      : Number(value)
    switch (op) {
      case "equals":
        return { [column]: { equals: numericValue } }
      case "notEquals":
        return { [column]: { not: numericValue } }
      case "lessThan":
        return { [column]: { lt: numericValue } }
      case "greaterThan":
        return { [column]: { gt: numericValue } }
      case "lessThanOrEqualTo":
        return { [column]: { lte: numericValue } }
      case "greaterThanOrEqualTo":
        return { [column]: { gte: numericValue } }
      case "between":
        const [startValue, endValue] = numericValue
        return { [column]: { gt: startValue || 0, lt: endValue || 999999 } }
      case "betweenInclusive":
        const [startValueInc, endValueInc] = numericValue
        return {
          [column]: { gte: startValueInc || 0, lte: endValueInc || 999999 },
        }
      default:
        throw new Error(`Unsupported number filter operator: ${op}`)
    }
  }
  throw new Error(`Unsupported number filter operator: ${op}`)
}

export const handleDateFilter = (column, value, op) => {
  if (numberAndDateOperators.includes(op)) {
    const dateValue = Array.isArray(value)
      ? value.map((date) => new Date(date))
      : new Date(value)
    switch (op) {
      case "equals":
        return { [column]: { equals: dateValue } }
      case "notEquals":
        return { [column]: { not: dateValue } }
      case "lessThan":
        return { [column]: { lt: dateValue } }
      case "greaterThan":
        return { [column]: { gt: dateValue } }
      case "lessThanOrEqualTo":
        return { [column]: { lte: dateValue } }
      case "greaterThanOrEqualTo":
        return { [column]: { gte: dateValue } }
      case "between":
        const [startValue, endValue] = dateValue
        return { [column]: { gt: startValue, lt: endValue } }
      case "betweenInclusive":
        const [startValueInc, endValueInc] = dateValue
        return { [column]: { gte: startValueInc, lte: endValueInc } }
      default:
        throw new Error(`Unsupported date filter operator: ${op}`)
    }
  }
  throw new Error(`Unsupported date filter operator: ${op}`)
}

export const handleTextFilter = (column, value, op) => {
  if (textOperators.includes(op)) {
    if (op === "equals") {
      return { [column]: value }
    } else if (op === "startsWith" || op === "endsWith" || op === "contains") {
      return { [column]: { [op]: value, mode: "insensitive" } }
    } else if (op === "notEquals") {
      return { [column]: { not: value } }
    } else if (op === "fuzzy") {
      return { [column]: {} }
    }
  }

  throw new Error(`Unsupported text filter operator: ${op}`)
}
