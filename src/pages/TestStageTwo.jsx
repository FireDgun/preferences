import React, { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { group1Couples, group2Couples } from "../utils/productsGroupsModels";
import RemoveTheBestTest from "../tests/removeTheBest/RemoveTheBestTest";
import RemoveTheWorstTest from "../tests/removeTheWorst/RemoveTheWorstTest";
import BottomUpTest from "../tests/bottomUp/BottomUpTest";
import TopDownTest from "../tests/topDown/TopDownTest";
import StaticTest from "../tests/static/StaticTest";
import PairwiseStaticTest from "../tests/pairwiseStatic/PairwiseStaticTest";
import IterativeCategorizationManager from "../tests/iterativeCategorization/IterativeCategorizationManager";

export default function TestStageTwo() {
  const [couples, setCouples] = useState([]);
  const [testNumber, setTestNumber] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      if (user.group % 2 === 0) {
        setCouples(group1Couples);
      } else {
        setCouples(group2Couples);
      }
      setTestNumber((user.group - 1) % 7);
    }
  }, [user]);
  console.log(user);
  if (user === null) return null;
  testNumber === null && <div>Loading...</div>;
  return (
    <>
      {testNumber === 0 && <RemoveTheBestTest couples={couples} />}
      {testNumber === 1 && <RemoveTheWorstTest couples={couples} />}
      {testNumber === 2 && <BottomUpTest couples={couples} />}
      {testNumber === 3 && <TopDownTest couples={couples} />}
      {testNumber === 4 && <IterativeCategorizationManager couples={couples} />}
      {testNumber === 5 && <StaticTest couples={couples} />}
      {testNumber === 6 && <PairwiseStaticTest couples={couples} />}
    </>
  );
}
