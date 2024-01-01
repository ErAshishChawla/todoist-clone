import { BsLayoutSidebar } from "react-icons/bs";
import CustomTooltip from "../../../../../ReusableComponents/CustomTooltip";
import FlexContainer from "../../../../../ReusableComponents/FlexContainer";

import useClasses from "../../../../../../hooks/useClasses";
import useReduxDispatch from "../../../../../../hooks/useReduxDispatch";
import useAppBarSlice from "../../../../../../hooks/useAppBarSlice";

import { forwardRef } from "react";
import { setShowAppBar } from "../../../../../../store";
import { Tooltip } from "antd";

const AppBarToggleButton = forwardRef(function AppBarToggleButton(props, ref) {
  const { className, ...rest } = props;

  const { showAppBar } = useAppBarSlice();
  const dispatch = useReduxDispatch();

  const classNames = useClasses(
    "flex-none justify-center items-center",
    "text-lg cursor-pointer hover:bg-appbar-item-hover p-1.5",
    "rounded-md",
    className
  );

  const handleClick = (e) => {
    dispatch(setShowAppBar(!showAppBar));
  };

  return (
    <FlexContainer
      className={classNames}
      ref={ref}
      {...rest}
      onClick={handleClick}
    >
      <CustomTooltip title="open/close sidebar" arrow={false}>
        <BsLayoutSidebar />
      </CustomTooltip>
    </FlexContainer>
  );
});

export default AppBarToggleButton;
