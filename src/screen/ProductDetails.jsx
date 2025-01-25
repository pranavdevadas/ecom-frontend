import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          width: "100%",
        }}
      >
        {!product ? (
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        ) : (
          <>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {product.description}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "green", marginBottom: 3 }}
            >
              ${product.price}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              <Link
                to={`/cart/${product.id}`}
                style={{ textDecoration: "none", color:'white' }}
              >
                Add to Cart
              </Link>
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ProductDetails;
