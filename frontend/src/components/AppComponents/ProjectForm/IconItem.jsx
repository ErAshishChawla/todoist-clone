import React, { useState } from "react";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import useProjectFormContext from "../../../hooks/useProjectFormContext";

import useClasses from "../../../hooks/useClasses";

function IconItem({ name, iconFn }) {
  const { formik } = useProjectFormContext();

  const iconClassNames = useClasses(
    "text-2xl gap-2 p-1  cursor-pointer flex-none rounded-md",
    {
      "bg-editTask-form-header-listType-hover": formik.values.iconName === name,
      "hover:bg-editTask-form-header-listType-hover":
        !formik.values.iconName === name,
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
        handleClick(name);
      }}
    >
      {iconFn()}
    </FlexContainer>
  );
}

export default IconItem;
