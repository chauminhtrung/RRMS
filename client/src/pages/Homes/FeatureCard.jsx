import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card">
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FeatureCard
