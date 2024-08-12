import React, { useEffect, useState } from "react";
import ShowProducts from "../components/ShowProducts";
import { Typography } from "@mui/material";

import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { OPTIONS_NAME } from "../optionsModel";

export default function RemoveTheWorstTest({ couples, handleFinish }) {
  const [productsRank, setProductsRank] = useState([]);
  const [products, setProducts] = useState(couples.flat());
  const [timeTaken, setTimeTaken] = useState(null);
  const { user, setUser } = useUser();
  const handleChooseProduct = (productNumber, productName) => {
    if (products.length === 2) {
      let theOtherProduct = products.find(
        (product) => product !== productNumber
      );
      setProductsRank([
        ...productsRank,
        productName,
        OPTIONS_NAME[`OPTION${theOtherProduct}`],
      ]);
      setProducts([]);
      return;
    }
    setProductsRank([...productsRank, productName]);
    setProducts((prev) => prev.filter((product) => product !== productNumber));
  };
  useEffect(() => {
    if (!timeTaken) {
      setTimeTaken(Date.now());
    }

    const handleDone = async () => {
      await setUserOnDb({
        ...user,
        preferencesStage2Attention: productsRank.toReversed(),
        timeTakenAttention: (Date.now() - timeTaken) / 1000,
      });
      setUser((prev) => ({
        ...prev,
        preferencesStage2Attention: productsRank.toReversed(),
      }));
      handleFinish();
    };
    if (products.length === 0) {
      handleDone();
    }
  }, [products, timeTaken, productsRank, handleFinish, setUser, user]);
  console.log(productsRank);
  console.log(user);

  return (
    <div>
      <Typography variant="h4" align="center">
        ג'ון תמיד מעדיף יותר כסף מאשר פחות כסף
      </Typography>
      {productsRank.length > 0 && (
        <Typography variant="h4" align="center">
          מבין הבחירות שנשארו
        </Typography>
      )}
      <Typography variant="h4" align="center">
        בחר את האפשרות שג'ון הכי פחות מעדיף
      </Typography>
      <ShowProducts
        products={products}
        handleChooseProduct={handleChooseProduct}
      />
    </div>
  );
}