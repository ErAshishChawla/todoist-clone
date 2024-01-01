import { Tooltip } from "antd";
import FlexContainer from "./FlexContainer";
import useClasses from "../../hooks/useClasses";
import { forwardRef } from "react";

const CustomTooltip = forwardRef(function CustomTooltip(props, ref) {
  const { children, className, ...rest } = props;

  const classNames = useClasses("", className);
  return (
    <Tooltip ref={ref} {...rest} className={classNames}>
      <FlexContainer className="flex-none">{children}</FlexContainer>
    </Tooltip>
  );
});
export default CustomTooltip;
