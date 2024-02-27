import React, { useState } from 'react';
import { InputNumber, Flex } from 'antd';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Content from './Content';
import { ClockCircleTwoTone } from '@ant-design/icons';
import Button from '@mui/material/Button'; // Added import for Button component

function ApplicationBar() {
  const [hours, setHours] = useState(0);
  const handleChange = (e) => {
    setHours(e);
  };

  // Function for handling logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example: Redirect the user to the login page or clear authentication token
    // console.log('Logout clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('VehicleSize');
    window.location.reload()
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Exam
          </Typography>
          <Flex gap="small" wrap="wrap">
            <InputNumber
              onChange={handleChange}
              size="large"
              defaultValue={0}
              in={0}
              max={100000}
              placeholder="Add Time (H)"
              prefix={<ClockCircleTwoTone />}
            />
          </Flex>
          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="sm">
          <Content hours={hours} />
        </Container>
      </Box>
    </Box>
  );
}

export default ApplicationBar;
