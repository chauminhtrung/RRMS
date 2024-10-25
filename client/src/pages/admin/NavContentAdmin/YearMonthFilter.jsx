import { useState } from 'react'
import { Box, Button, Tooltip } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { styled } from '@mui/system'

const months = [
  { label: 'T.1', month: 1 },
  { label: 'T.2', month: 2 },
  { label: 'T.3', month: 3 },
  { label: 'T.4', month: 4 },
  { label: 'T.5', month: 5 },
  { label: 'T.6', month: 6 },
  { label: 'T.7', month: 7 },
  { label: 'T.8', month: 8 },
  { label: 'T.9', month: 9 },
  { label: 'T.10', month: 10 },
  { label: 'T.11', month: 11 },
  { label: 'T.12', month: 12 },
]

const MonthFilterContainer = styled('div')({
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

const MonthContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  padding: '5px',
})

const YearButton = styled(Button)({
  width: '150px',
  color: 'black',
  border: '2px solid transparent',
  transition: 'border-color 0.3s, box-shadow 0.3s',

  '&.active': {
    backgroundColor: '#54a7ed6b',
    border: '2px solid #337ab7',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },

  '&:hover': {
    border: '2px solid #337ab7',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
})

const MonthButton = styled(Button)({
  width: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'black',
  border: '2px solid transparent',
  transition: 'border-color 0.3s, box-shadow 0.3s',

  '&.active': {
    backgroundColor: '#c7e2f96b',
    border: '2px solid #8fc8f9',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },

  '&:hover': {
    border: '2px solid #337ab7',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
})

const YearMonthFilter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1) // Tháng hiện tại (tháng 0 là tháng 1)

  // xử lý khi nhấp vào một tháng
  const handleMonthClick = (month) => {
    setSelectedMonth(month) // Cập nhật tháng đã chọn
    console.log(`Tháng đã chọn: ${month}, Năm: ${currentYear}`)
  }

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1) // Giảm năm hiện tại đi 1
  }

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1) // Tăng năm hiện tại lên 1
  }

  return (
    <MonthFilterContainer>
      <MonthContainer>
        <YearButton onClick={handlePreviousYear} startIcon={<ArrowBack />}>
          Năm trước
        </YearButton>

        {/* Lặp qua danh sách các tháng để tạo nút cho từng tháng */}
        {months.map((month) => (
          <Tooltip
            key={month.month}
            title={`Xem lịch sử hóa đơn Zalo tháng ${month.label}/${currentYear}`}
            placement="bottom">
            <MonthButton
              onClick={() => handleMonthClick(month.month)}
              className={selectedMonth === month.month ? 'active' : ''} // 'active' nếu tháng được chọn
            >
              <div className="text">
                <b>{month.label}</b> {/* Hiển thị tên tháng */}
              </div>
              <span>{currentYear}</span> {/* Hiển thị năm hiện tại */}
            </MonthButton>
          </Tooltip>
        ))}

        <YearButton onClick={handleNextYear} endIcon={<ArrowForward />}>
          Năm tới
        </YearButton>
      </MonthContainer>
    </MonthFilterContainer>
  )
}

export default YearMonthFilter
