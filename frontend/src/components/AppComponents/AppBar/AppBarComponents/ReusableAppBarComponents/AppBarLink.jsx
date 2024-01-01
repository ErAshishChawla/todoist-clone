import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import { NavLink } from "react-router-dom";

import useClasses from "../../../../../hooks/useClasses";
import useAppBarSlice from "../../../../../hooks/useAppBarSlice";

import { forwardRef } from "react";

const AppBarLink = forwardRef(function AppBarLink(props, ref) {
  const {
    linkClassName,
    children,
    to,
    label,
    icon,
    iconClassName,
    text,
    textClassName,
    textStyle,
    onClick,
    ...rest
  } = props;

  const { appBarWidth } = useAppBarSlice();

  const linkClassNames = ({ isActive, isPending }) => {
    return useClasses(
      "flex flex-row flex-1",
      "p-1.5 rounded-md",
      "text-black",
      "items-center justify-between hover:bg-appbar-button",
      {
        "bg-appbar-button": isActive,
      },
      linkClassName
    );
  };
  const iconClassNames = useClasses("flex-none text-2xl", iconClassName);
  const textClassNames = useClasses("flex-none text-sm", textClassName);

  return (
    <NavLink className={linkClassNames} ref={ref} to={to} {...rest}>
      <FlexContainer
        className="gap-1.5 flex-none items-center"
        onClick={onClick}
      >
        <FlexContainer className={iconClassNames}>{icon}</FlexContainer>
        <FlexContainer
          className={textClassNames}
          style={{ maxWidth: appBarWidth - 100 }}
        >
          {text}
        </FlexContainer>
      </FlexContainer>
      {label && (
        <FlexContainer className="flex-none text-xs">{label}</FlexContainer>
      )}
    </NavLink>
  );
});

export default AppBarLink;
