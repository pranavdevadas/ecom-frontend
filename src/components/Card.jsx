import React, {useState} from "react";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";


function Card({ products }) {

  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const productsPerPage = 18;
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <div>
      <Grid container spacing={2} justifyContent="center" >
        {currentProducts.map((product) => {
          const imageUrl = product.images[0];
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    width: "90%",
                    height: "100%",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={product.title}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "green", marginBottom: 2 }}
                  >
                    ${product.price}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    View Details
                  </Button>
                </Paper>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 4, marginBottom: 4, alignContent:'center' }}
      />
    </div>
  );
}

export default Card;
