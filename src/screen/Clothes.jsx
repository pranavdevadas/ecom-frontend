import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import Card from "../components/Card";

function Clothes() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products/?categoryId=1")
      .then((response) => {
        console.log(response.data)
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: 4,
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
       Clothes
      </Typography>

      <Card products={products} />
    </Container>
  );
}

export default Clothes;
