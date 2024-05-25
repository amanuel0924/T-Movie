function formatDuration(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / 60000)

  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return `${hours}h ${remainingMinutes}m`
}

export { formatDuration }
