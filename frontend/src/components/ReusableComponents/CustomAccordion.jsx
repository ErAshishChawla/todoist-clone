import { useState, forwardRef } from "react";
import { IoChevronForward } from "react-icons/io5";

import FlexContainer from "./FlexContainer";
import useClasses from "../../hooks/useClasses";

const CustomAccordion = forwardRef(function CustomAccordion(
  { header, data, containerClassName, headerClassName, dataClassName },
  ref
) {
  const [isOpen, setIsOpen] = useState(true);

  const containerClassNames = useClasses(
    "flex-col gap-4 cursor-pointer select-none",
    containerClassName
  );
  const headerClassNames = useClasses(
    "flex-none w-full items-center gap-2",
    headerClassName
  );
  const dataClassNames = useClasses("", dataClassName);
  const triggerIconClassNames = useClasses("flex-none p-0", {
    "rotate-90": isOpen,
  });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((s) => !s);
  };

  return (
    <FlexContainer className={containerClassNames} ref={ref}>
      <FlexContainer className={headerClassNames} onClick={handleClick}>
        <FlexContainer className={triggerIconClassNames}>
          <IoChevronForward />
        </FlexContainer>
        <FlexContainer>{header}</FlexContainer>
      </FlexContainer>
      {isOpen && (
        <FlexContainer className={dataClassNames}>{data}</FlexContainer>
      )}
    </FlexContainer>
  );
});

export default CustomAccordion;
