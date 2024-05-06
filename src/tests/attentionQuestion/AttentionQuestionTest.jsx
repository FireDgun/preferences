import React from "react";
import ShowProducts from "../components/ShowProducts";
import { Typography } from "@mui/material";

export default function AttentionQuestionTest({ handleFinish }) {
  return (
    <div>
      <Typography variant="h6" align="center">
        בחר את המוצר השמאלי ביותר
      </Typography>
      <ShowProducts
        products={[10, 11, 12, 13]}
        handleChooseProduct={(product) => {
          if (product === 10) handleFinish();
          else alert("נסה שוב");
        }}
        savePlace={false}
      />
    </div>
  );
}
