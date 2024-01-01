import React, { useState } from "react";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import useProjectFormContext from "../../../hooks/useProjectFormContext";

import useClasses from "../../../hooks/useClasses";

function IconItem({ name, iconFn }) {
  const { formik } = useProjectFormContext();
  const [isSelected, setIsSelected] = useState(false);

  const iconClassNames = useClasses(
    "text-2xl gap-2 p-1  cursor-pointer flex-none rounded-md",
    {
      "bg-editTask-form-header-listType-hover": isSelected,
      "hover:bg-editTask-form-header-listType-hover": !isSelected,
    }
  );

  const handleClick = (iconName) => {
    return formik.handleChange({
      target: {
        name: "iconName",
        value: iconName,
      },
    });
  };

  return (
    <FlexContainer
      className={iconClassNames}
      onClick={() => {
        setIsSelected(true);
        handleClick(name);
      }}
    >
      {iconFn()}
    </FlexContainer>
  );
}

export default IconItem;
