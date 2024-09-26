import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Text = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 3 }}>
        Cho thuê phòng trọ TPHCM chất lượng, giá rẻ
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        TPHCM là khu vực tập trung dân cư đông nhất cả nước với số dân hơn 9 triệu người, trong đó dân cư ngoại tỉnh
        chiếm phần đông. Vì vậy, cho thuê phòng trọ TPHCM là dịch vụ rất phát triển tại đây.
      </Typography>

      <Box
        sx={{
          transition: 'max-height 0.5s linear, opacity 0.5s linear, transform 0.5s linear',
          maxHeight: showMore ? '1000px' : '0',
          opacity: showMore ? 1 : 0.5,
          transform: showMore ? 'translateY(0)' : 'translateY(-10px)',
          overflow: 'hidden',
        }}>
        {showMore && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Với thực trạng “đất chật người đông” và dịch vụ cho thuê phòng trọ TPHCM có nhiều cạnh tranh, việc tìm
              được một căn trọ như ý là điều không dễ dàng. Hiểu được nỗi lòng đó, DQ4T mang đến cho bạn giải pháp tìm
              phòng trọ TPHCM nhanh chóng, uy tín, chất lượng.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
              Đặc điểm khu vực
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                mt: 2,
              }}>
              <img
                src="https://picsum.photos/1000/500?random=1"
                alt="Random"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 3 }}>
              TPHCM hiện có 16 quận, 5 huyện và 1 thành phố. Dịch vụ{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                cho thuê phòng trọ TPHCM
              </Typography>{' '}
              cũng trải dài theo các vị trí này. Trong đó, phòng trọ gần trường, gần KCN, gần chợ, gần siêu thị là những
              vị trí “đắc địa”, nhận được nhiều sự quan tâm của khách thuê.
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Có thể thấy, đối tượng lựa chọn loại hình {}
              <Typography variant="span" sx={{ fontWeight: 'bold', mt: 3 }}>
                cho thuê phòng trọ TPHCM
              </Typography>
              {} rất đa dạng, thuộc nhiều độ tuổi và ngành nghề khác nhau. Từ đó, đặt ra nhu cầu tìm phòng trọ khác
              nhau, bao gồm cả về vị trí, giá cả, diện tích và các tiện ích xung quanh.
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Không chỉ cung cấp thông tin về dịch vụ{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                cho thuê phòng trọ TPHCM
              </Typography>
              ,{' '}
              <Link
                onClick={() => {
                  window.open('https://rrms.vercel.app', '_blank')
                }}
                variant="span"
                sx={{ fontWeight: 'bold', color: 'blue', m: 2 }}>
                rrms.vercel.app
              </Link>{' '}
              còn mang giải pháp tìm trọ nhanh đến người dùng trên mọi miền đất nước như phòng trọ Hà Nội,{' '}
              <Typography variant="span" sx={{ color: 'blue' }}>
                phòng trọ Đà Nẵng, phòng trọ Cần Thơ
              </Typography>
              ,... DQ4T sẽ đồng hành để mang đến cho bạn căn trọ hài lòng nhất.
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Button onClick={() => setShowMore(!showMore)} sx={{ mt: 2, color: 'blue' }}>
          {showMore ? 'Ẩn bớt' : 'Xem thêm'}
        </Button>
      </Box>
    </Box>
  )
}

export default Text
