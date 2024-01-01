import useClasses from "../../../hooks/useClasses";

import FlexContainer from "../../ReusableComponents/FlexContainer";

import { forwardRef } from "react";

const ContentContainer = forwardRef(function ContentContainer(props, ref) {
  const { children, className, ...rest } = props;

  const classNames = useClasses("justify-center relative", className);
  return (
    <FlexContainer className={classNames} {...rest} ref={ref}>
      {children}
    </FlexContainer>
  );
});

export default ContentContainer;
