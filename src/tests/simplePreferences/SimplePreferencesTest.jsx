import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";
import { group1Couples } from "../../utils/productsGroupsModels";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import MoreDetails from "./MoreDetails";

export default function SimplePreferencesTest() {
  const [choise, setChoise] = useState([]);
  const [coupleIndex, setCoupleIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(0);

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleChooseProduct = async (productIndex) => {
    if (coupleIndex < group1Couples.length) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; // Time taken in milliseconds
      setStartTime(Date.now());

      setChoise((prev) => [
        ...prev,
        {
          win: OPTIONS_NAME[
            "OPTION" + group1Couples[coupleIndex][productIndex]
          ],
          lose: OPTIONS_NAME[
            "OPTION" + group1Couples[coupleIndex][1 - productIndex]
          ],
          timeTaken: timeTaken,
        },
      ]);
      setCoupleIndex((prev) => prev + 1);
    } else {
      console.log("done");
    }
  };
  const handleDone = useCallback(async () => {
    await setUserOnDb({
      ...user,
      preferencesStage1: choise,
      stage: 2,
      age: age,
      gender: gender,
    });
    setUser((prev) => ({ ...prev, preferencesStage1: choise, stage: 2 }));
    navigate(ROUTES.TEST_STAGE_ONE_FINISH);
  }, [age, choise, gender, navigate, setUser, user]);

  useEffect(() => {
    if (coupleIndex === group1Couples.length + 1) {
      handleDone();
    }
  }, [coupleIndex, handleDone]);

  if (coupleIndex === group1Couples.length) {
    return (
      <MoreDetails
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        setCoupleIndex={setCoupleIndex}
      />
    );
  }

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
        {coupleIndex < group1Couples.length && (
          <Box key={coupleIndex}>
            <Button onClick={() => handleChooseProduct(0)} sx={{ marginX: 1 }}>
              <img
                src={OPTIONS["OPTION" + group1Couples[coupleIndex][0]]}
                alt="option1"
                style={{ width: 250, height: 250 }}
              />
            </Button>
            <Button onClick={() => handleChooseProduct(1)} sx={{ marginX: 1 }}>
              <img
                src={OPTIONS["OPTION" + group1Couples[coupleIndex][1]]}
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
