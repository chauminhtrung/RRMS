import { BarChart } from '@mui/icons-material'

const dataset = [
  {
    rating: 50,
    start: '1',
  },
  {
    rating: 50,
    start: '2',
  },
  {
    rating: 100,
    start: '3',
  },
  {
    rating: 100,
    start: '4',
  },
  {
    rating: 200,
    start: '5',
  },
]

const chartSetting = {
  xAxis: [],
  height: 200,
}

const ChartRaiting = () => {
  function valueFormatter(value) {
    return `${value} đánh giá`
  }
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'start' }]}
      series={[{ dataKey: 'rating', color: '#7bed9f', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  )
}

export default ChartRaiting
