import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { OPTIONS } from "../optionsModel";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const RankedProductsTable = ({
  rankedProducts,
  onUnrank,
  moveUp,
  moveDown,
}) => (
  <TableContainer component={Paper} align="right" sx={{ width: "80%" }}>
    <Table aria-label="ranked products" align="right">
      <TableHead align="right">
        <TableRow>
          <TableCell align="right"></TableCell>
          <TableCell align="right">מוצר</TableCell>
          <TableCell align="right" sx={{ textAlign: "right" }}>
            דירוג
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody align="right">
        {rankedProducts.map((product, index) => (
          <TableRow
            key={OPTIONS[`OPTION${product}`]}
            sx={{
              textAlign: "right",
            }}
            align="right"
          >
            <TableCell align="left">
              <Button onClick={() => onUnrank(product)}>הסר</Button>
              {index !== 0 && (
                <IconButton onClick={() => moveUp(index)}>
                  <ArrowDropUpIcon />
                </IconButton>
              )}
              {index !== rankedProducts.length - 1 && (
                <IconButton onClick={() => moveDown(index)}>
                  <ArrowDropDownIcon />
                </IconButton>
              )}
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                src={OPTIONS[`OPTION${product}`]}
                alt={`option${index + 1}`}
                style={{ width: 40, height: 40 }}
              />
            </TableCell>

            <TableCell align="right">{index + 1}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default RankedProductsTable;
