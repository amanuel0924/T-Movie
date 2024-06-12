// import Fuse from "fuse.js"
// function convertDateToLocal(dateWithTimezone) {
//   const dateObj = new Date(dateWithTimezone)
//   const timezoneOffset = dateObj.getTimezoneOffset() * 60000
//   const dateWithoutTimezone = new Date(dateObj.valueOf() - timezoneOffset)
//   return dateWithoutTimezone
// }

// export const startsWith = (row, id, value) => {
//   let match = false
//   match = row[id].toString().toLowerCase().startsWith(value.toLowerCase())
//   return match
// }

// export const endsWith = (row, id, value) => {
//   let match = false
//   match = row[id].toString().toLowerCase().endsWith(value.toLowerCase())
//   return match
// }

// export const contains = (row, id, value) => {
//   let match = false
//   match = row[id].toString().toLowerCase().includes(value.toLowerCase())
//   return match
// }

// export const fuzzy = () => {
//   // const fruits = ['apple', 'orange', 'banana', 'pear']
//   // const fuse = new Fuse(fruits)
//   // console.log(fuse.getIndex().size())
//   return true
// }

// export const equals = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] === parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() ===
//       new Date(convertDateToLocal(value)).getTime()
//   } else if (type === "boolean") {
//     match = row[id] === (value === "true")
//   } else if (type === "array") {
//     if (value.length >= 1) {
//       match = value.includes(row[id])
//     } else {
//       match = true
//     }
//   } else {
//     match = row[id] === value
//   }
//   return match
// }

// export const notEquals = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] !== parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() !==
//       new Date(convertDateToLocal(value)).getTime()
//   } else if (type === "boolean") {
//     match = row[id] !== (value === "true")
//   } else if (type === "array") {
//     value = val
//     if (value.length >= 1) {
//       match = !value.includes(row[id])
//     } else {
//       match = true
//     }
//   } else {
//     match = row[id] !== value
//   }
//   return match
// }

// export const lessThan = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] < parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() <
//       new Date(convertDateToLocal(value)).getTime()
//   } else {
//     match = row[id].toLowerCase() < value.toLowerCase()
//   }
//   return match
// }

// export const greaterThan = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] > parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() >
//       new Date(convertDateToLocal(value)).getTime()
//   } else {
//     match = row[id].toLowerCase() > value.toLowerCase()
//   }
//   return match
// }

// export const lessThanOrEqualTo = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] <= parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() <=
//       new Date(convertDateToLocal(value)).getTime()
//   } else {
//     match = row[id].toLowerCase() <= value.toLowerCase()
//   }
//   return match
// }

// export const greaterThanOrEqualTo = (row, id, value, type) => {
//   let match = false
//   if (type === "number") {
//     match = row[id] >= parseInt(value, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() >=
//       new Date(convertDateToLocal(value)).getTime()
//   } else {
//     match = row[id].toLowerCase() >= value.toLowerCase()
//   }
//   return match
// }

// export const between = (row, id, value, type) => {
//   let match = false
//   const [startValue, endValue] = value
//   if (startValue && endValue) {
//     if (type === "number") {
//       match =
//         row[id] > parseInt(startValue, 10) && row[id] < parseInt(endValue, 10)
//     } else if (type === "date") {
//       match =
//         new Date(row[id]).getTime() >
//           new Date(convertDateToLocal(startValue)).getTime() &&
//         new Date(row[id]).getTime() <
//           new Date(convertDateToLocal(endValue)).getTime()
//     } else {
//       match =
//         row[id].toLowerCase() > startValue.toLowerCase() &&
//         row[id].toLowerCase() < endValue.toLowerCase()
//     }
//   } else if (startValue) {
//     return greaterThan(row, id, startValue, type)
//   } else if (endValue) {
//     return lessThan(row, id, endValue, type)
//   } else {
//     match = true
//   }
//   return match
// }

// export const betweenInclusive = (row, id, value, type) => {
//   let match = false
//   const [startValue, endValue] = value
//   if (startValue && endValue) {
//     if (type === "number") {
//       match =
//         row[id] >= parseInt(startValue, 10) && row[id] <= parseInt(endValue, 10)
//     } else if (type === "date") {
//       match =
//         new Date(row[id]).getTime() >=
//           new Date(convertDateToLocal(startValue)).getTime() &&
//         new Date(row[id]).getTime() <=
//           new Date(convertDateToLocal(endValue)).getTime()
//     } else {
//       match =
//         row[id].toLowerCase() >= startValue.toLowerCase() &&
//         row[id].toLowerCase() <= endValue.toLowerCase()
//     }
//   } else if (startValue) {
//     return greaterThanOrEqualTo(row, id, startValue, type)
//   } else if (endValue) {
//     return lessThanOrEqualTo(row, id, endValue, type)
//   } else {
//     match = true
//   }
//   return match
// }

// export const empty = (row, id) => {
//   return row[id] === "" || row[id] === null
// }

// export const notEmpty = (row, id) => {
//   return row[id] !== "" && row[id] !== null
// }

// export const createFilterConditionFunction = (
//   row,
//   column,
//   value,
//   mode,
//   type
// ) => {
//   switch (mode) {
//     case "startsWith":
//       return startsWith(row, column, value)
//     case "contains":
//       return contains(row, column, value)
//     case "endsWith":
//       return endsWith(row, column, value)
//     case "equals":
//       return equals(row, column, value, type)
//     case "notEquals":
//       return notEquals(row, column, value, type)
//     case "lessThan":
//       return lessThan(row, column, value, type)
//     case "greaterThan":
//       return greaterThan(row, column, value, type)
//     case "lessThanOrEqualTo":
//       return lessThanOrEqualTo(row, column, value, type)
//     case "greaterThanOrEqualTo":
//       return greaterThanOrEqualTo(row, column, value, type)
//     case "between":
//       return between(row, column, value, type)
//     case "betweenInclusive":
//       return betweenInclusive(row, column, value, type)
//     case "empty":
//       return empty(row, column)
//     case "notEmpty":
//       return notEmpty(row, column)
//     default:
//       console.warn(`Unsupported filter mode: ${mode}`)
//       return {}
//   }
// }
