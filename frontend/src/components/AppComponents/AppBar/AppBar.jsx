import useClasses from "../../../hooks/useClasses";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import AppBarInternalContainer from "./AppBarComponents/AppBarInternalContainer/AppBarInternalContainer";

import { forwardRef } from "react";

const AppBar = forwardRef(function AppBar(props, ref) {
  const { className, ...rest } = props;

  const classNames = useClasses(className);
  return (
    <FlexContainer className={classNames} ref={ref} {...rest}>
      <AppBarInternalContainer />
    </FlexContainer>
  );
});

export default AppBar;
