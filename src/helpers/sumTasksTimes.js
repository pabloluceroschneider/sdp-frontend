
const sumTasksTimes = ({ tasks = [] }) => {

  const totalEstimated = Number(tasks.reduce((acc, item) => {
    return acc + (item.estimate || 0)
  }, 0)).toFixed(2);

  const totalCalculated = Number(tasks.reduce((acc, item) => {
    return acc + (item.calculated || 0)
  }, 0)).toFixed(2);

  return { totalEstimated, totalCalculated }

}

export default sumTasksTimes