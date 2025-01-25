import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function Checkout() {
  const { id, quantity } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("address1");

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error);
      });
  }, [id]);

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handlePlaceOrder = () => {
    navigate("/thankyou");
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Typography variant="h6">Shipping Address</Typography>
        <Select value={address} onChange={handleAddressChange} fullWidth>
          <MenuItem value="address1">123 Abc St, City 678732</MenuItem>
          <MenuItem value="address2">456 Xyz St, City 788232</MenuItem>
        </Select>

        <FormLabel component="legend" sx={{ marginTop: 2 }}>
          Payment Method
        </FormLabel>

        <RadioGroup value="cod" onChange={handlePaymentChange} row>
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery (COD)"
          />
        </RadioGroup>
        {!product ? (
          <>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          </>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{product.title}</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="right">
                     $ {(product.price * quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      Total
                    </TableCell>
                    <TableCell align="right">
                      ${(product.price * quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              sx={{ marginTop: 4 }}
              fullWidth
            >
              Place Order
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Checkout;
