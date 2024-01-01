import FlexContainer from "../components/ReusableComponents/FlexContainer";

import { SiTodoist } from "react-icons/si";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function LoadingPage() {
  return (
    <>
      <FlexContainer className="w-screen h-screen flex-col justify-center items-center gap-10 ">
        <FlexContainer className="flex-none text-6xl text-todo-logo">
          <SiTodoist />
        </FlexContainer>
        <FlexContainer className="flex-none">
          <Spin
            indicator={
              <LoadingOutlined
                className="text-initialLoader"
                style={{ fontSize: 36 }}
                spin
              />
            }
          />
        </FlexContainer>
      </FlexContainer>
    </>
  );
}

export default LoadingPage;
