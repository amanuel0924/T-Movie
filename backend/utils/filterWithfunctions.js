// function convertDateToLocal(dateWithTimezone) {
//   // Create a new Date object from the date with timezone
//   const dateObj = new Date(dateWithTimezone)

//   // Get the timezone offset in milliseconds
//   const timezoneOffset = dateObj.getTimezoneOffset() * 60000

//   // Create a new date object without the timezone offset
//   const dateWithoutTimezone = new Date(dateObj.valueOf() - timezoneOffset)

//   // Format the date as YYYY-MM-DD string without timezone information
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
//   if (type === "number") {
//     match =
//       row[id] > parseInt(startValue, 10) && row[id] < parseInt(endValue, 10)
//   } else if (type === "date") {
//     match =
//       new Date(row[id]).getTime() >
//         new Date(convertDateToLocal(startValue)).getTime() &&
//       new Date(row[id]).getTime() <
//         new Date(convertDateToLocal(endValue)).getTime()
//   } else {
//     match =
//       row[id].toLowerCase() > startValue.toLowerCase() &&
//       row[id].toLowerCase() < endValue.toLowerCase()
//   }
//   return match
// }

// export const betweenInclusive = (row, id, value, type) => {
//   let match = false
//   const [startValue, endValue] = value
//   if (type === "number") {
//     match =
//       row[id] >= parseInt(startValue, 10) && row[id] <= parseInt(endValue, 10)
//   }
//   if (type === "date") {
//     match =
//       new Date(row[id]).getTime() >=
//         new Date(convertDateToLocal(startValue)).getTime() &&
//       new Date(row[id]).getTime() <=
//         new Date(convertDateToLocal(endValue)).getTime()
//   } else {
//     match =
//       row[id].toLowerCase() >= startValue.toLowerCase() &&
//       row[id].toLowerCase() <= endValue.toLowerCase()
//   }
//   return match
// }

// export const multiSelect = (row, id, value) => {
//   let match = false
//   match = value.includes(row[id])
//   return match
// }
