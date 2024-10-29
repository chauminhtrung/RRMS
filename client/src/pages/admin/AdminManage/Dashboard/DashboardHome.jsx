import { Grid, Card, CardContent, Typography, Stack, Chip, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardHome = () => {
  const cardData = [
    { title: 'Total Page Views', value: '4,42,236', percent: '59.3%', extra: '35,000' },
    { title: 'Total Users', value: '12,345', percent: '25.5%', extra: '2,500' },
    { title: 'New Subscriptions', value: '3,210', percent: '40.2%', extra: '1,500' },
    { title: 'Revenue', value: '$15,240', percent: '15.7%', extra: '$2,000' },
  ];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={0}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="h4">{card.value}</Typography>
                    </Grid>
                    <Grid item>
                      <Chip label={card.percent} color="primary" size="small" />
                    </Grid>
                  </Grid>
                  <Box>
                    <Typography variant="caption">
                      You made an extra <Typography component="span" variant="caption" color="text.primary">{card.extra}</Typography> this year
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Line chart */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Revenue Over Time
            </Typography>
            <Line data={data} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default DashboardHome;
