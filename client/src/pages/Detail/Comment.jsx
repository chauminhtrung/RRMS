import { Avatar, Box, Card, CardContent, Rating, Typography } from '@mui/material'

const Comment = () => {
  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 3, '--Card-radius': 0, mb: 1 }}>
        <CardContent orientation="horizontal">
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" variant="rectangular" width={44} height={44} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="text" width={100}>
              Trí Dũng
            </Typography>
            <Rating value={3} size="small" readOnly />
          </Box>
        </CardContent>
        <CardContent sx={{ pt: 0, '&:last-child': { pb: 1 } }}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur vel harum voluptatibus aspernatur atque,
            inventore laboriosam modi eos quidem non, nisi quos sequi quisquam. A quia quam doloribus ipsa quo?
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default Comment
