import FlexContainer from "../components/ReusableComponents/FlexContainer";
import InboxPage from "./DataPages/InboxPage";

import { Routes, Route } from "react-router-dom";
import TodayPage from "./DataPages/TodayPage";
import UpcomingPage from "./DataPages/UpcomingPage";
import AuthPage from "./AuthPages/AuthPage";

function RouterPage() {
  return (
    <FlexContainer className="max-w-[700px]">
      <Routes>
        <Route element={<InboxPage />} path="/inbox" />
        <Route element={<TodayPage />} path="/today" />
        <Route element={<UpcomingPage />} path="/upcoming" />
      </Routes>
    </FlexContainer>
  );
}

export default RouterPage;
