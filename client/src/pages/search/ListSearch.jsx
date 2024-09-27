/* eslint-disable no-unused-vars */
import { Box, Grid, Typography, Card, CardMedia, CardContent, Container } from '@mui/material'
import { styled } from '@mui/system'

const HoverCardMedia = styled(CardMedia)(({ theme }) => ({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)', // Scale the image on hover
  },
}))

const HoverTypography = styled(Typography)(({ theme }) => ({
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main, // Change text color on hover
  },
}))

const RoomFeatureCard = ({ image, title, description }) => (
  <Card
    sx={{
      p: 2,
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
      },
    }}>
    <HoverCardMedia component="img" alt={title} image={image} sx={{ width: '100%', height: '100', margin: 'auto' }} />
    <CardContent sx={{ flexGrow: 1 }}>
      <HoverTypography variant="h6" gutterBottom>
        {title}
      </HoverTypography>
      <HoverTypography variant="body2">{description}</HoverTypography>
    </CardContent>
  </Card>
)

const ListSearch = () => {
  return (
    <Container>
      <Box p={2}>
        {/* Row 2: Chương trình - DQ4T */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Chương trình - DQ4T
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            {
              title: 'Hỗ trợ tân sinh viên',
              description: 'Hỗ trợ tân sinh viên nhập học',
              image: 'https://picsum.photos/1000/500?random=9',
            },
            {
              title: 'Giảm giá cực sâu',
              description: 'Giảm giá tại DQ4T',
              image: 'https://picsum.photos/1000/500?random=7',
            },
            {
              title: 'Kết nối chủ nhà',
              description: 'Giúp theo dõi hóa đơn',
              image: 'https://picsum.photos/1000/500?random=10',
            },
            {
              title: 'Tour xe Hot',
              description: 'Tour tại Ninh Thuận 2.999k',
              image: 'https://picsum.photos/1000/500?random=1',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RoomFeatureCard title={item.title} description={item.description} image={item.image} />
            </Grid>
          ))}
        </Grid>

        {/* Row 3: Tìm phòng trọ theo tỉnh / thành phố */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tìm phòng trọ theo tỉnh / thành phố
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              title: 'Phòng trọ Hồ Chí Minh',
              image: 'https://picsum.photos/1000/500?random=2',
            },
            {
              title: 'Phòng trọ Hà Nội',
              image: 'https://picsum.photos/1000/500?random=3',
            },
            {
              title: 'Phòng trọ Cần Thơ',
              image: 'https://picsum.photos/1000/500?random=4',
            },
            {
              title: 'Phòng trọ Bình Dương',
              image: 'https://picsum.photos/1000/500?random=5',
            },
            {
              title: 'Phòng trọ Đà Nẵng',
              image: 'https://picsum.photos/1000/500?random=6',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <RoomFeatureCard title={item.title} description="" image={item.image} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default ListSearch
