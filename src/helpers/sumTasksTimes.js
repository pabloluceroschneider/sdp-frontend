
const sumTasksTimes = ({ tasks }) => {

  const totalEstimated = tasks.reduce((acc, item) => {
    return acc + (item.estimate || 0)
  }, 0)

  const totalCalculated = tasks.reduce((acc, item) => {
    return acc + (item.calculated || 0)
  }, 0)

  return { totalEstimated, totalCalculated }

}

export default sumTasksTimes