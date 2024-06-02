import React, { useState } from "react";
import ShowProducts from "../components/ShowProducts";
import { Typography } from "@mui/material";

export default function AttentionQuestionTest({ handleFinish }) {
  const [tryCount, setTryCount] = useState(0);
  return (
    <div>
      <Typography variant="h4" align="center" mb={10}>
        בחר את המנורה
      </Typography>
      <ShowProducts
        products={[10, 11, 12, 13]}
        handleChooseProduct={(product) => {
          if (product === 12) {
            localStorage.setItem("attentionQuestion", tryCount);
            handleFinish();
          } else {
            setTryCount((prev) => prev + 1);
            alert("נסה שוב");
          }
        }}
        savePlace={false}
      />
    </div>
  );
}
