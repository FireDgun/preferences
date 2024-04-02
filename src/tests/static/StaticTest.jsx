import React, { useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import ShowProducts from "../components/ShowProducts";
import RankedProductsTable from "./RankedProductsTable";

const StaticTest = ({ couples, handleDone, title = "" }) => {
  const [products, setProducts] = useState(couples.flat());
  const [rankedProducts, setRankedProducts] = useState([]);
  const handleChooseProduct = (product) => {
    setRankedProducts((prev) => [...prev, product]);
    setProducts((prev) => prev.filter((p) => p !== product));
  };

  const handleUnrankProduct = (product) => {
    setProducts((prev) => [...prev, product]);
    setRankedProducts((prev) => prev.filter((p) => p !== product));
  };

  const handleMoveUp = (index) => {
    if (index <= 0) return; // No move if it's the first item
    setRankedProducts((prev) => [
      ...prev.slice(0, index - 1),
      prev[index],
      prev[index - 1],
      ...prev.slice(index + 1),
    ]);
  };

  const handleMoveDown = (index) => {
    setRankedProducts((prev) => {
      if (index >= prev.length - 1) return prev; // No move if it's the last item
      return [
        ...prev.slice(0, index),
        prev[index + 1],
        prev[index],
        ...prev.slice(index + 2),
      ];
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" align="center">
        דרג את המוצרים
      </Typography>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          <Grid item xs={12} md={8}>
            <Typography variant="h6" align="center">
              מוצרים
            </Typography>
            <ShowProducts
              products={products}
              handleChooseProduct={handleChooseProduct}
              width={100}
              height={100}
            />
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleDone(rankedProducts)}
            >
              שמור
            </Button>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" align="center">
            דירוג
          </Typography>
          <RankedProductsTable
            rankedProducts={rankedProducts}
            onUnrank={handleUnrankProduct}
            moveDown={handleMoveDown}
            moveUp={handleMoveUp}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaticTest;
