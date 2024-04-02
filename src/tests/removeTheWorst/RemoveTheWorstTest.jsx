import React, { useEffect, useState } from "react";
import ShowProducts from "../components/ShowProducts";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { OPTIONS_NAME } from "../optionsModel";

export default function RemoveTheWorstTest({ couples }) {
  const [productsRank, setProductsRank] = useState([]);
  const [products, setProducts] = useState(couples.flat());
  const [timeTaken, setTimeTaken] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
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
        preferencesStage2: productsRank.reverse(),
        stage: 3,
        testNumber: 1,
        timeTaken: (Date.now() - timeTaken) / 1000,
      });
      setUser((prev) => ({
        ...prev,
        preferencesStage2: productsRank.reverse(),
        stage: 3,
        testNumber: 1,
      }));
      navigate(ROUTES.THANK_YOU);
    };
    if (products.length === 0) {
      handleDone();
    }
  }, [products, timeTaken, productsRank, navigate, setUser, user]);

  return (
    <div>
      <Typography variant="h4" align="center">
        בחר את המוצר שהכי פחות טוב לדעתך
      </Typography>
      <ShowProducts
        products={products}
        handleChooseProduct={handleChooseProduct}
      />
    </div>
  );
}
