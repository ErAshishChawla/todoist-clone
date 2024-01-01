import * as Icons from "react-icons/tb";
import React, { useState, useEffect, useMemo } from "react";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import IconItem from "./IconItem";

import useProjectFormContext from "../../../hooks/useProjectFormContext";

import useDebounce from "../../../hooks/useDebouncedValue";

function IconDisplay() {
  const { formik } = useProjectFormContext();
  const { iconSearch } = formik.values;

  const entriesIcons = useMemo(() => {
    return Object.entries(Icons);
  }, [Icons]);

  const [filteredIcons, setFilteredIcons] = useState(entriesIcons);

  const debouncedIconSearch = useDebounce(iconSearch, 400);

  useEffect(() => {
    setFilteredIcons(
      entriesIcons
        .filter(([name]) => {
          const iconSearchText = debouncedIconSearch.toLowerCase();
          const nameText = name.toLowerCase();
          return iconSearchText ? nameText.includes(iconSearchText) : true;
        })
        .slice(0, 9)
    );
  }, [debouncedIconSearch]);

  const renderedFilteredIcons = useMemo(() => {
    return filteredIcons.map(([name, iconFn], idx) => {
      return <IconItem name={name} iconFn={iconFn} key={idx} />;
    });
  }, [filteredIcons]);

  return (
    <FlexContainer className="flex-none w-full overflow-x-auto border border-todo-checkbox rounded-md p-2 gap-2">
      {!iconSearch
        ? "Icon Search"
        : !renderedFilteredIcons.length > 0
        ? "No Matching Icons"
        : renderedFilteredIcons}
    </FlexContainer>
  );
}

export default IconDisplay;
