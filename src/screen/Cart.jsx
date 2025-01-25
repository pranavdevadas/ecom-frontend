import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';


const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleCheckout = () => {
    navigate(`/checkout/${id}/${quantity}`);
  };

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) =>
      action === "increase" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
    );
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        <TableContainer component={Paper}>
          {!product ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleQuantityChange("decrease")}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span style={{ margin: "0 10px" }}>{quantity}</span>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={quantity >= 5}
                        onClick={() => handleQuantityChange("increase")}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${(quantity * product.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
          sx={{ marginTop: 3 }}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Container>
  );
};

export default Cart;
