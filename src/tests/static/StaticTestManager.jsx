import React, { useEffect, useState } from "react";
import { OPTIONS_NAME } from "../optionsModel";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import StaticTest from "./StaticTest";
import ROUTES from "../../routes/routesModel";
const handleProductNames = (products) => {
  let productsNames = [];
  products.forEach((product) => {
    productsNames.push(OPTIONS_NAME["OPTION" + product]);
  });
  return productsNames;
};
export default function StaticTestManager({ couples }) {
  const [timeTaken, setTimeTaken] = useState(null);
  const [isExampleDone, setIsExampleDone] = useState(false);

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleDone = async (rankedProducts) => {
    let productsNames = handleProductNames(rankedProducts);

    await setUserOnDb({
      ...user,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 6,
      timeTaken: (Date.now() - timeTaken) / 1000,
    });
    setUser((prev) => ({
      ...prev,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 6,
    }));
    navigate(ROUTES.THANK_YOU);
  };
  useEffect(() => {
    if (!timeTaken) {
      setTimeTaken(Date.now());
    }
  }, [timeTaken]);

  if (!isExampleDone) {
    return (
      <div>
        <StaticTest
          title={"שלב מקדים"}
          handleDone={() => {
            setIsExampleDone(true);
            setTimeTaken(Date.now());
          }}
          couples={[
            [10, 11],
            [12, 13],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <StaticTest key="realTest" handleDone={handleDone} couples={couples} />
      </div>
    );
  }
}
