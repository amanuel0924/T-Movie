export const startsWith = (column, val) => {
  return { [column]: { startsWith: val, mode: "insensitive" } }
}
export const endsWith = (column, val) => {
  return { [column]: { endsWith: val, mode: "insensitive" } }
}
export const contains = (column, val) => {
  return { [column]: { contains: val, mode: "insensitive" } }
}
export const fuzzy = (column, val) => {
  return { [column]: { contains: val, mode: "insensitive" } }
}

export const equals = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: value }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: value }
  } else if (type === "checkbox") {
    value = val === "true"
    return { [column]: value }
  } else if (type === "multiSelect") {
    value = val
    if (value.length >= 1) {
      return { [column]: { in: value } }
    }
    return {}
  } else {
    value = val
    return { [column]: { equals: value, mode: "insensitive" } }
  }
}

export const notEquals = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: { not: value } }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: { not: value } }
  } else if (type === "checkbox") {
    value = val === "true"
    return { [column]: { not: value } }
  } else if (type === "multiSelect") {
    value = val
    if (value.length >= 1) {
      return { [column]: { notIn: value } }
    }
    return {}
  } else {
    value = val
    return { [column]: { not: value, mode: "insensitive" } }
  }
}

export const between = (column, val, type) => {
  let value = val

  if (value[0] && value[1]) {
    if (type === "number") {
      value = val.map(Number)
      return { [column]: { gt: value[0], lt: value[1] } }
    } else if (type === "date") {
      value = val.map((date) => new Date(date))
      return { [column]: { gt: value[0], lt: value[1] } }
    } else {
      value = val
      return { [column]: { gt: value[0], lt: value[1], mode: "insensitive" } }
    }
  } else if (value[0]) {
    return greaterThan(column, value[0], type)
  } else if (value[1]) {
    return lessThan(column, value[0], type)
  } else {
    return { [column]: {} }
  }
}

export const betweenInclusive = (column, val, type) => {
  let value = val
  if (value[0] && value[1]) {
    if (type === "number") {
      value = val.map(Number)
      return { [column]: { gte: value[0], lte: value[1] } }
    } else if (type === "date") {
      value = val.map((date) => new Date(date))
      return { [column]: { gte: value[0], lte: value[1] } }
    } else {
      value = val
      return { [column]: { gte: value[0], lte: value[1], mode: "insensitive" } }
    }
  } else if (value[0]) {
    return greaterThanOrEqualTo(column, value[0], type)
  } else if (value[1]) {
    return lessThanOrEqualTo(column, value[0], type)
  } else {
    return { [column]: {} }
  }
}
export const lessThan = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: { lt: value } }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: { lt: value } }
  } else {
    value = val
    return { [column]: { lt: value, mode: "insensitive" } }
  }
}

export const greaterThan = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: { gt: value } }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: { gt: value } }
  } else {
    value = val
    return { [column]: { gt: value, mode: "insensitive" } }
  }
}

export const lessThanOrEqualTo = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: { lte: value } }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: { lte: value } }
  } else {
    value = val
    return { [column]: { lte: value, mode: "insensitive" } }
  }
}

export const greaterThanOrEqualTo = (column, val, type) => {
  let value
  if (type === "number") {
    value = Number(val)
    return { [column]: { gte: value } }
  } else if (type === "date") {
    value = new Date(val)
    return { [column]: { gte: value } }
  } else {
    value = val
    return { [column]: { gte: value, mode: "insensitive" } }
  }
}

export const empty = (column) => {
  return { [column]: { equals: null } }
}
export const notEmpty = (column) => {
  return { [column]: { not: null } }
}

export const createFilterCondition = (column, value, mode, type) => {
  switch (mode) {
    case "startsWith":
      return startsWith(column, value, type)
    case "contains":
      return contains(column, value, type)
    case "endsWith":
      return endsWith(column, value, type)
    case "fuzzy":
      return fuzzy(column, value)
    case "equals":
      return equals(column, value, type)
    case "notEquals":
      return notEquals(column, value, type)
    case "lessThan":
      return lessThan(column, value, type)
    case "greaterThan":
      return greaterThan(column, value, type)
    case "lessThanOrEqualTo":
      return lessThanOrEqualTo(column, value, type)
    case "greaterThanOrEqualTo":
      return greaterThanOrEqualTo(column, value, type)
    case "between":
      return between(column, value, type)
    case "betweenInclusive":
      return betweenInclusive(column, value, type)
    case "empty":
      return empty(column)
    case "notEmpty":
      return notEmpty(column)
    default:
      console.warn(`Unsupported filter mode: ${mode}`)
      return {}
  }
}
