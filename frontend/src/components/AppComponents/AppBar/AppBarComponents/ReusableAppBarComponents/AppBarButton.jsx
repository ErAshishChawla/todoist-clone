import { forwardRef } from "react";

import Button from "../../../../ReusableComponents/Button";
import useClasses from "../../../../../hooks/useClasses";
import FlexContainer from "../../../../ReusableComponents/FlexContainer";

const AppBarButton = forwardRef(function AppBarButton(props, ref) {
  const { buttonClassName, icon, iconClassName, text, textClassName, ...rest } =
    props;

  const buttonClassNames = useClasses(
    "items-center gap-1.5 hover:bg-appbar-button",
    buttonClassName
  );
  const iconClassNames = useClasses("flex-none text-2xl", iconClassName);
  const textClassNames = useClasses("flex-none text-sm", textClassName);
  return (
    <Button className={buttonClassNames} ref={ref} {...rest}>
      <FlexContainer className={iconClassNames}>{icon}</FlexContainer>
      <FlexContainer className={textClassNames}>{text}</FlexContainer>
    </Button>
  );
});

export default AppBarButton;
