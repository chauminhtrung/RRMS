import { BarChart } from '@mui/x-charts'

const ChartRaiting = ({ reviews }) => {
  const ratingCounts = [0, 0, 0, 0, 0]

  reviews.forEach((review) => {
    const rating = review.rating
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++
    }
  })

  const dataset = ratingCounts.map((count, index) => ({
    rating: count,
    start: (index + 1).toString(),
  }))

  const chartSetting = {
    xAxis: [],
    height: 200,
  }
  function valueFormatter(value) {
    return `${value} đánh giá`
  }
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'start' }]}
      series={[{ dataKey: 'rating', color: '#5eb7ff', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  )
}

export default ChartRaiting
