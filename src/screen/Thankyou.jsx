import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'

function Thankyou() {
    const navigate = useNavigate()
  return (
    <Container sx={{ marginTop: 8, textAlign: "center" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CheckCircleOutline color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h4" color="success" gutterBottom>
          Thank You for Your Purchase!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Your order has been successfully placed. We appreciate your trust in us.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 3 }}
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default Thankyou;
