import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { paymentStripe } from '~/apis/paymentAPI'
import { toast } from 'react-toastify'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const StripePayment = ({ stripeDetails }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const handlePaymentStripe = async (e) => {
    e.preventDefault() // Ngừng reload trang

    if (!stripe || !elements) {
      alert('Stripe is not ready.')
      return
    }

    try {
      // Gửi yêu cầu tới backend
      const res = await paymentStripe(stripeDetails)
      const clientSecret = res.data.clientSecret

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: stripeDetails.email }
        }
      })

      if (error) {
        console.error('Payment failed:', error.message)
        toast.error('Thanh toán thất bại!')
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Thanh toán thành công!')
        navigate('/')
      }
    } catch (error) {
      console.error('Error during payment:', error)
      toast.error('Đã xảy ra lỗi trong quá trình thanh toán.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom align="center">
          Thanh toán Stripe
        </Typography>
        <form onSubmit={handlePaymentStripe}>
          <Box sx={{ marginBottom: 2 }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    letterSpacing: '0.025em',
                    lineHeight: '24px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px'
                  },
                  complete: {
                    color: '#2e7d32'
                  }
                }
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={!stripe}
            sx={{
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}>
            Thanh toán
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default StripePayment
