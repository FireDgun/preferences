import React, { useEffect, useState } from "react";
import { OPTIONS_NAME } from "../optionsModel";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import StaticTest from "./StaticTest";
const handleProductNames = (products) => {
  let productsNames = [];
  products.forEach((product) => {
    productsNames.push(OPTIONS_NAME["OPTION" + product]);
  });
  return productsNames;
};

export default function StaticTestManager({ couples, handleFinish }) {
  const [timeTaken, setTimeTaken] = useState(null);

  const { user, setUser } = useUser();

  const handleDone = async (rankedProducts) => {
    let productsNames = handleProductNames(rankedProducts);

    await setUserOnDb({
      ...user,
      preferencesStage2Attention: productsNames,

      timeTakenAttention: (Date.now() - timeTaken) / 1000,
    });
    setUser((prev) => ({
      ...prev,
      preferencesStage2Attention: productsNames,
    }));
    handleFinish();
  };
  useEffect(() => {
    if (!timeTaken) {
      setTimeTaken(Date.now());
    }
  }, [timeTaken]);

  return (
    <div>
      <StaticTest
        key="realTest"
        handleDone={handleDone}
        couples={couples}
        title="ג'ון תמיד מעדיף יותר כסף מאשר פחות כסף. עזרו לג'ון לדרג את האפשרויות"
      />
    </div>
  );
}
