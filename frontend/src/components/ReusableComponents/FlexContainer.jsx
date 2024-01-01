import { forwardRef } from "react";

import useClasses from "../../hooks/useClasses";

const FlexContainer = forwardRef(function FlexContainer(props, ref) {
  const { className, children, ...rest } = props;
  return (
    <div className={useClasses("flex flex-1", className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});
export default FlexContainer;
