import useClasses from "../../../hooks/useClasses";
import useReduxDispatch from "../../../hooks/useReduxDispatch";
import useAppBarSlice from "../../../hooks/useAppBarSlice";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import AppBar from "./AppBar";

import { forwardRef } from "react";

import { setIsResizing, setAppBarWidth } from "../../../store";

const ResizeableAppBar = forwardRef(function ResizeableAppBar(props, ref) {
  const { className, ...rest } = props;
  const classNames = useClasses("bg-appbar flex-none w-full", className);
  const dispatch = useReduxDispatch();

  const { isResizing } = useAppBarSlice();

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    dispatch(setIsResizing(true));
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    const newWidth = e.clientX;
    if (newWidth < 220 || newWidth > 440) {
      return;
    }
    dispatch(setAppBarWidth(newWidth));
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    dispatch(setIsResizing(false));
  };

  return (
    <FlexContainer className={classNames} ref={ref} {...rest}>
      <AppBar
        onMouseMove={isResizing ? handleMouseMove : null}
        onMouseUp={isResizing ? handleMouseUp : null}
      />
      <FlexContainer
        className="hover:bg-gray-300 cursor-col-resize flex-none h-full w-[5px]"
        onMouseDown={handleResizeMouseDown}
        onMouseUp={handleMouseUp}
      ></FlexContainer>
    </FlexContainer>
  );
});

export default ResizeableAppBar;
