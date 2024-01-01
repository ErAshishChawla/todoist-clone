import useClasses from "../../../../../hooks/useClasses";
import { forwardRef } from "react";

import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import AppBarHeader from "../AppBarHeader/AppBarHeader";
import AppBarLinks from "../AppBarLinks/AppBarLinks";
import AppBarProjects from "../AppBarProjects/AppBarProjects";

const AppBarInternalContainer = forwardRef(function AppBarInternalContainer(
  props,
  ref
) {
  const { children, className, ...rest } = props;

  const classNames = useClasses("flex-col gap-2 flex-none w-full", className);

  return (
    <FlexContainer className={classNames} {...rest} ref={ref}>
      <AppBarHeader />
      <AppBarLinks />
      <AppBarProjects />
    </FlexContainer>
  );
});

export default AppBarInternalContainer;
