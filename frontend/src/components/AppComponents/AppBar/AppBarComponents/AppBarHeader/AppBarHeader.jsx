import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import UserOptions from "./AppBarHeaderContent/UserOptions";

import useClasses from "../../../../../hooks/useClasses";

import { forwardRef } from "react";
import AppBarToggleButton from "./AppBarHeaderContent/AppBarToggleButton";
import CustomTooltip from "../../../../ReusableComponents/CustomTooltip";

const AppBarHeader = forwardRef(function AppBarHeader(props, ref) {
  const { className, ...rest } = props;

  const classNames = useClasses(
    "flex-none w-full items-center justify-between px-2.5 py-4",
    className
  );

  return (
    <FlexContainer className={classNames} ref={ref} {...rest}>
      <CustomTooltip title="user options" arrow={false}>
        <UserOptions />
      </CustomTooltip>

      <AppBarToggleButton />
    </FlexContainer>
  );
});

export default AppBarHeader;
