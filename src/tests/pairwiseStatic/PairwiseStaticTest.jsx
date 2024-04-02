import React, { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";
import { setUserOnDb } from "../../auth/authService";
import ROUTES from "../../routes/routesModel";
import { Box, Button, Typography } from "@mui/material";

export default function PairwiseStaticTest({ couples }) {
  const products = couples.flat();
  const [allPossibleCouples, setAllPossibleCouples] = useState(null);
  const [choise, setChoise] = useState([]);
  const [coupleIndex, setCoupleIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [startTimeChoise, setStartTimeChoise] = useState(Date.now());

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    let allCouples = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        allCouples.push([products[i], products[j]]);
      }
    }
    // Shuffle the couples array
    allCouples = shuffleArray(allCouples);
    setAllPossibleCouples(allCouples);
  }, [products]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleChooseProduct = async (productIndex) => {
    if (coupleIndex < allPossibleCouples.length) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTimeChoise) / 1000; // Time taken in milliseconds

      setChoise((prev) => [
        ...prev,
        {
          win: OPTIONS_NAME[
            "OPTION" + allPossibleCouples[coupleIndex][productIndex]
          ],
          lose: OPTIONS_NAME[
            "OPTION" + allPossibleCouples[coupleIndex][1 - productIndex]
          ],
          timeTaken: timeTaken,
        },
      ]);
      setStartTimeChoise(Date.now());
      setCoupleIndex((prev) => prev + 1);
    } else {
      console.log("done");
    }
  };

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const handleDone = async () => {
      await setUserOnDb({
        ...user,
        preferencesStage2: choise,
        stage: 3,
        testNumber: 7,
        timeTaken: (Date.now() - startTime) / 1000,
      });
      setUser((prev) => ({
        ...prev,
        preferencesStage2: choise,
        stage: 3,
        testNumber: 7,
      }));
      navigate(ROUTES.THANK_YOU);
    };

    if (coupleIndex >= allPossibleCouples?.length) {
      handleDone();
    }
  }, [
    coupleIndex,
    startTime,
    choise,
    navigate,
    setUser,
    user,
    allPossibleCouples,
  ]);

  return (
    <Box padding={10}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", padding: 10 }}
      >
        בחרו את המוצר המועדף עליכם
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {allPossibleCouples && coupleIndex < allPossibleCouples.length && (
          <Box key={coupleIndex}>
            <Button onClick={() => handleChooseProduct(0)} sx={{ marginX: 1 }}>
              <img
                src={OPTIONS["OPTION" + allPossibleCouples[coupleIndex][0]]}
                alt="option1"
                style={{ width: 250, height: 250 }}
              />
            </Button>
            <Button onClick={() => handleChooseProduct(1)} sx={{ marginX: 1 }}>
              <img
                src={OPTIONS["OPTION" + allPossibleCouples[coupleIndex][1]]}
                alt="option2"
                style={{ width: 250, height: 250 }}
              />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
