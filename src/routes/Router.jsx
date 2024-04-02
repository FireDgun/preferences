import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import ROUTES from "./routesModel";
import Welcome from "../pages/Welcome";
import Details from "../pages/Details";
import ThankYou from "../pages/ThankYou";
import Explanation from "../pages/Explanation";
import TestPage from "../pages/TestPage";
import LogIn from "../pages/LogIn";
import FinishStageOne from "../tests/simplePreferences/FinishStageOne";
import { useUser } from "../providers/UserProvider";
import DashboardPage from "../dashboard/pages/DashboardPage";
import StageOneClosed from "../tests/StageOneClosed";

export default function Router() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      //if the route is not the root route, navigate to the root route
      if (window.location.pathname !== ROUTES.ROOT) {
        navigate(ROUTES.ROOT);
      }
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<LogIn />} />
      <Route path={ROUTES.WELCOME} element={<Welcome />} />
      <Route path={ROUTES.DETAILS} element={<Details />} />
      <Route path={ROUTES.THANK_YOU} element={<ThankYou />} />
      <Route path={ROUTES.EXPLANATION} element={<Explanation />} />
      <Route path={ROUTES.TEST} element={<TestPage />} />
      <Route path={ROUTES.TEST_STAGE_ONE_FINISH} element={<FinishStageOne />} />
      <Route path={ROUTES.TEST_STAGE_ONE_CLOSED} element={<StageOneClosed />} />

      <Route path={ROUTES.ADMIN} element={<DashboardPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
