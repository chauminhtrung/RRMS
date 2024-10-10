import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const NextArrow = ({ onClick, visible }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        right: 10,
        zIndex: 1,
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
      <ArrowCircleRightIcon
        sx={{
          color: '#f1f2f6',
          transition: 'transform 0.3s, color 0.3s',
          '&:hover': {
            transform: 'scale(1.2)',
            color: '#1e90ff',
          },
        }}
        fontSize="large"
      />
    </div>
  )
}

export default NextArrow
