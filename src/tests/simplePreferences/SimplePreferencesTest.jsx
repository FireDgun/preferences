import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { OPTIONS, OPTIONS_NAME } from "../optionsModel";
import { group2Couples } from "../../utils/productsGroupsModels";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import MoreDetails from "./MoreDetails";
import { useShowBlackScreenForPeriodOfTime } from "../../providers/ShowBlackScreenForPeriodOfTimeProvider";
function shuffleAndGroup(arr) {
  // Flatten the array
  const flatArray = arr.flat();

  // Shuffle the flat array using the Fisher-Yates algorithm
  for (let i = flatArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = flatArray[i];
    flatArray[i] = flatArray[j];
    flatArray[j] = temp;
  }

  // Regroup the flat array into arrays of two elements
  const result = [];
  for (let i = 0; i < flatArray.length; i += 2) {
    result.push([flatArray[i], flatArray[i + 1]]);
  }

  return result;
}
const group1Couples = shuffleAndGroup(group2Couples);
export default function SimplePreferencesTest() {
  const [choise, setChoise] = useState([]);
  const [coupleIndex, setCoupleIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(0);
  const showBlackScreenForPeriodOfTime = useShowBlackScreenForPeriodOfTime();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleChooseProduct = async (productIndex) => {
    showBlackScreenForPeriodOfTime(500);
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
      stage1Timestamp: Date.now(),
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
