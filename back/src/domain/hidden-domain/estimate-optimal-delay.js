/* eslint-disable no-mixed-operators */
function estimateOptimalDelay(points) {
  const x = Math.log10(points)
  return Math.round(-10.894 * (x ** 4)
    + (78.951 * (x ** 3))
    - (156.59 * (x ** 2))
    - (67.962 * x)
    + 365)
}

function calculateDiffer(points) {
  return Math.round(estimateOptimalDelay(points) / 2)
}

module.exports = {
  estimateOptimalDelay,
  calculateDiffer,
}
