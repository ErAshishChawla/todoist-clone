import FlexContainer from "../../ReusableComponents/FlexContainer";
import ResizeableAppBar from "./ResizeableAppBar";

import useAppSlice from "../../../hooks/useAppSlice";
import useAppBarSlice from "../../../hooks/useAppBarSlice";
import useReduxDispatch from "../../../hooks/useReduxDispatch";

import { setAppBarWidth, setIsResizing, setShowAppBar } from "../../../store";

import { createPortal } from "react-dom";
import { forwardRef } from "react";
import useClasses from "../../../hooks/useClasses";

const ResponsiveAppBar = forwardRef(function ResponsiveAppBar(props, ref) {
  const { windowWidth } = useAppSlice();
  const { appBarWidth, isResizing } = useAppBarSlice();

  const { className, ...rest } = props;

  const dispatch = useReduxDispatch();

  const handleOverlayClick = () => {
    dispatch(setShowAppBar(false));
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

  if (windowWidth > 750) {
    return (
      <ResizeableAppBar
        ref={ref}
        className={useClasses(
          {
            "cursor-col-resize": isResizing,
          },
          className
        )}
        style={{
          width: appBarWidth,
          minWidth: 220,
          maxWidth: 440,
        }}
        {...rest}
      />
    );
  }

  if (windowWidth <= 750) {
    return createPortal(
      <FlexContainer>
        <FlexContainer
          className={useClasses("bg-overlay absolute inset-0", {
            "cursor-col-resize": isResizing,
          })}
          onClick={handleOverlayClick}
          onMouseMove={isResizing ? handleMouseMove : null}
          onMouseUp={isResizing ? handleMouseUp : null}
        />
        <ResizeableAppBar
          className={useClasses(
            "h-full absolute top-0 left-0 bottom-0",
            {
              "cursor-col-resize": isResizing,
            },
            className
          )}
          style={{
            width: appBarWidth,
            minWidth: 220,
            maxWidth: 440,
          }}
          ref={ref}
          {...rest}
        />
      </FlexContainer>,
      document.querySelector(".modal-container")
    );
  }
});

export default ResponsiveAppBar;
