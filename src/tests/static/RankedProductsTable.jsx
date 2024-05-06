// RankedProductsTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { OPTIONS } from "../optionsModel";

const RankedProductsTable = ({
  rankedProducts,
  handleDropRanked,
  handleRemoveRanked,
  allowDrop,
}) => (
  <Paper
    sx={{
      width: "300px",
      direction: "rtl",
      maxHeight: "80vh", // Set a max height for the paper
      overflowY: "auto", // Enable vertical scrolling
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ textAlign: "right" }}>דירוג</TableCell>
          <TableCell sx={{ textAlign: "right" }}>מוצר</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rankedProducts.map((product, index) => (
          <TableRow
            key={index}
            onDragOver={allowDrop}
            onDrop={(e) => handleDropRanked(e, index)}
          >
            <TableCell sx={{ textAlign: "right" }}>{index + 1}</TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              {Number.isInteger(product) ? (
                <img
                  src={OPTIONS[`OPTION${product}`]}
                  alt={`Ranked ${index + 1}`}
                  draggable
                  onDragStart={(e) => handleRemoveRanked(e, index)}
                  style={{ width: 50, height: 50 }}
                />
              ) : (
                <Box sx={{ width: 50, height: 50, border: "2px dashed" }} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default RankedProductsTable;
