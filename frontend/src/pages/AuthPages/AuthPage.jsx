import { Outlet } from "react-router-dom";
import FlexContainer from "../../components/ReusableComponents/FlexContainer";

import { SiTodoist } from "react-icons/si";
function AuthPage() {
  return (
    <FlexContainer className="w-full h-full flex-col items-center">
      <FlexContainer className="flex-col max-w-[500px] py-8 px-4 gap-24 w-full">
        <FlexContainer className="items-center flex-none gap-2 text-4xl text-todo-logo justify-start w-full">
          <SiTodoist className="" />
          <FlexContainer className="flex-none font-semibold text-3xl">
            todoist
          </FlexContainer>
        </FlexContainer>

        <FlexContainer className="w-full flex-none  py-4">
          <FlexContainer className="flex-none w-full">
            <Outlet />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

export default AuthPage;
