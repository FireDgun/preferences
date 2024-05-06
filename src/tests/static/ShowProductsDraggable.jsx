import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";

export default function ShowProductsDraggable({
  products,
  handleChooseProduct = () => {},
  handleDragStart = () => {}, // This is expected to always be provided in this component
  width = 130,
  height = 130,
}) {
  const [removedIndices, setRemovedIndices] = useState(new Set()); // Tracks removed items

  const handleRemoveProduct = (effectiveIndex, product) => {
    setRemovedIndices(new Set(removedIndices.add(effectiveIndex))); // Add effective index to removed set
    handleChooseProduct(product, OPTIONS_NAME[`OPTION${product}`]);
  };

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {Array.from({ length: 10 }).map((_, index) => {
          const countRemovedBeforeIndex = Array.from(removedIndices).filter(
            (i) => i < index
          ).length;
          const effectiveIndex = index - countRemovedBeforeIndex;
          const product = products[effectiveIndex];

          return (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              {removedIndices.has(index) ||
              effectiveIndex >= products.length ? (
                <div style={{ width: width, height: height }} /> // Empty space
              ) : (
                <Button
                  onClick={() => handleRemoveProduct(index, product)}
                  sx={{ marginX: 1 }}
                  onDragStart={(e) => handleDragStart(e, product)}
                  draggable={true} // Always draggable in this component
                >
                  <img
                    src={OPTIONS[`OPTION${product}`]}
                    alt={`option${effectiveIndex + 1}`}
                    style={{ width: width, height: height }}
                  />
                </Button>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
