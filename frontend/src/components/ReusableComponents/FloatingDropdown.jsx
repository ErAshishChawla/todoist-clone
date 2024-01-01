import React, { forwardRef, useState } from "react";

import useClasses from "../../hooks/useClasses";

import FlexContainer from "./FlexContainer";

const FloatingDropdown = forwardRef(function FloatingDropdown(
  { children, className, items, ...rest },
  ref
) {
  const [showMenu, isShowMenu] = useState(false);
  const classNames = useClasses("", className);

  const handleClick = () => {
    isShowMenu((s) => {
      return !s;
    });
  };

  return (
    <FlexContainer
      {...rest}
      ref={ref}
      className={classNames}
      onClick={handleClick}
    >
      <FlexContainer>{children}</FlexContainer>
      {showMenu && <FlexContainer></FlexContainer>}
    </FlexContainer>
  );
});

export default FloatingDropdown;
