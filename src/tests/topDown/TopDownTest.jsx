import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";
import { setUserOnDb } from "../../auth/authService";
import ROUTES from "../../routes/routesModel";
const handleProductNames = (products) => {
  let productsNames = [];
  products.forEach((product) => {
    productsNames.push(OPTIONS_NAME["OPTION" + product]);
  });
  return productsNames;
};
export default function TopDownTest({ couples }) {
  const [productsRank, setProductsRank] = useState([couples[0][0]]);
  const products = couples.flat();
  const [newProduct, setNewProduct] = useState(couples[0][1]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [indexToCompare, setIndexToCompare] = useState(0);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleChooseProduct = (productIndex) => {
    if (productIndex === 0) {
      setProductsRank((prev) => [
        ...prev.slice(0, indexToCompare + 1), // Includes the item at indexToCompare
        newProduct, // Inserts newProduct after indexToCompare
        ...prev.slice(indexToCompare + 1), // Rest of the array after indexToCompare
      ]);

      setIndexToCompare(productsRank.length);
      setNewProduct(products[productsRank.length + 1]);
    } else {
      if (indexToCompare === 0) {
        setProductsRank([newProduct, ...productsRank]);
        setIndexToCompare(productsRank.length);
        setNewProduct(products[productsRank.length + 1]);
      } else {
        setIndexToCompare((prev) => prev - 1);
      }
    }
  };

  const handleDone = useCallback(async () => {
    let productsNames = handleProductNames(productsRank);
    productsNames = productsNames.reverse();
    await setUserOnDb({
      ...user,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 4,
      timeTaken: (Date.now() - timeTaken) / 1000,
    });
    setUser((prev) => ({
      ...prev,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 4,
    }));
    navigate(ROUTES.THANK_YOU);
  }, [navigate, productsRank, setUser, timeTaken, user]);

  useEffect(() => {
    if (!timeTaken) {
      setTimeTaken(Date.now());
    }
  }, [timeTaken]);
  useEffect(() => {
    if (productsRank.length === 10) {
      handleDone();
    }
  }, [productsRank, handleDone]);

  if (OPTIONS["OPTION" + newProduct] === undefined) {
    return <div>טוען...</div>;
  }
  return (
    <Box padding={10}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", padding: 10 }}
      >
        איזה מוצר אתה פחות מעדיף?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Button onClick={() => handleChooseProduct(0)} sx={{ marginX: 1 }}>
            <img
              src={OPTIONS["OPTION" + productsRank[indexToCompare]]}
              alt="option1"
              style={{ width: 250, height: 250 }}
            />
          </Button>
          <Button onClick={() => handleChooseProduct(1)} sx={{ marginX: 1 }}>
            <img
              src={OPTIONS["OPTION" + newProduct]}
              alt="option2"
              style={{ width: 250, height: 250 }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
