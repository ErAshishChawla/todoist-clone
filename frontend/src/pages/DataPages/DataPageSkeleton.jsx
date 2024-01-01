import React from "react";

import FlexContainer from "../../components/ReusableComponents/FlexContainer";

function DataPageSkeleton({ children, title }) {
  return (
    <FlexContainer className="flex-col gap-8 pt-14 pb-24">
      <FlexContainer className="flex-none w-full text-xl font-bold capitalize break-all">
        {title}
      </FlexContainer>
      <FlexContainer className="flex-col gap-4 flex-none w-full ">
        {children}
      </FlexContainer>
    </FlexContainer>
  );
}

export default DataPageSkeleton;
