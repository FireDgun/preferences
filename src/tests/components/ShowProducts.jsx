import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";

export default function ShowProducts({
  products,
  handleChooseProduct,
  width = 230,
  height = 230,
}) {
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
            <Button
              onClick={() =>
                handleChooseProduct(product, OPTIONS_NAME[`OPTION${product}`])
              }
              sx={{ marginX: 1 }}
            >
              <img
                src={OPTIONS[`OPTION${product}`]}
                alt={`option${index + 1}`}
                style={{ width: width, height: height }}
              />
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
