import React from "react";
import ShowProducts from "../components/ShowProducts";
import { Typography } from "@mui/material";

export default function AttentionQuestionTest({ handleFinish }) {
  return (
    <div>
      <Typography variant="h4" align="center" mb={10}>
        בחר את המנורה
      </Typography>
      <ShowProducts
        products={[10, 11, 12, 13]}
        handleChooseProduct={(product) => {
          if (product === 12) {
            localStorage.setItem("attentionQuestion", 0);
            handleFinish();
          } else {
            localStorage.setItem("attentionQuestion", 1);
            handleFinish();
          }
        }}
        savePlace={false}
      />
    </div>
  );
}
