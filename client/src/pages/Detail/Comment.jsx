import { Avatar, Box, Card, CardContent, Rating, Typography } from '@mui/material'

const Comment = ({ item }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, '--Card-radius': 0, mb: 1 }}>
      <CardContent orientation="horizontal">
        <Avatar src={item.account.avatar} alt={item.account.fullname} variant="rectangular" width={44} height={44} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="text" width={100}>
            {item.account.fullname}
          </Typography>
          <Rating value={item.rating} size="small" readOnly />
        </Box>
      </CardContent>
      <CardContent sx={{ pt: 0, '&:last-child': { pb: 1 } }}>
        <Typography variant="body1">{item.comment}</Typography>
      </CardContent>
    </Card>
  )
}

export default Comment
