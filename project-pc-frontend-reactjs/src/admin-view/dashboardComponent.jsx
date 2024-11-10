// src/admin-view/dashboardComponent.jsx
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Thẻ thông tin đầu tiên */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">150</Typography>
          </Paper>
        </Grid>

        {/* Thẻ thông tin thứ hai */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">New Orders</Typography>
            <Typography variant="h3">35</Typography>
          </Paper>
        </Grid>

        {/* Thẻ thông tin thứ ba */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Feedback</Typography>
            <Typography variant="h3">27</Typography>
          </Paper>
        </Grid>

        {/* Thẻ hiển thị bảng thống kê */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            {/* Giả sử bạn thêm bảng hoặc danh sách hoạt động */}
            <ul>
              <li>User A registered</li>
              <li>User B placed a new order</li>
              <li>Feedback from User C</li>
              {/* Thêm các hoạt động khác */}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;