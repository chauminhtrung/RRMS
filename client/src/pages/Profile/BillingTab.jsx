import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const BillingTab = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Billing Info Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Current monthly bill</Typography>
            <Typography variant="h4" sx={{ marginTop: '10px' }}>
              $20.00
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              Switch to yearly billing
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Next payment due</Typography>
            <Typography variant="h4" sx={{ marginTop: '10px' }}>
              July 15
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              View payment history
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Current plan</Typography>
            <Typography variant="h4" sx={{ marginTop: '10px' }}>
              Freelancer
            </Typography>
            <Button variant="text" sx={{ marginTop: '10px' }}>
              Upgrade plan
            </Button>
          </Paper>
        </Grid>

        {/* Payment Methods Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Payment Methods
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
              Add Payment Method
            </Button>
            {/* Payment methods list */}
            <Box>
              <Typography variant="body1">Visa ending in 1234, Expires 04/2024</Typography>
              <Button variant="text">Default</Button> | <Button variant="text">Edit</Button>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant="body1">Mastercard ending in 5678, Expires 05/2022</Typography>
              <Button variant="text">Make Default</Button> | <Button variant="text">Edit</Button>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant="body1">American Express ending in 9012, Expires 01/2026</Typography>
              <Button variant="text">Make Default</Button> | <Button variant="text">Edit</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Billing History Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Billing History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>#39201</TableCell>
                    <TableCell>06/15/2021</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>Pending</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#38594</TableCell>
                    <TableCell>05/15/2021</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Typography color="green">Paid</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#38223</TableCell>
                    <TableCell>04/15/2021</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Typography color="green">Paid</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#38125</TableCell>
                    <TableCell>03/15/2021</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Typography color="green">Paid</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BillingTab
