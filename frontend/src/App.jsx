import { Outlet } from "react-router-dom";

import FlexContainer from "./components/ReusableComponents/FlexContainer";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <FlexContainer className="flex-col w-full h-full bg-main-app">
      <Outlet />
      <ToastContainer />
    </FlexContainer>
  );
}

export default App;
