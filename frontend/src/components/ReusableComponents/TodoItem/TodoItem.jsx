import React, { useState } from "react";

import FlexContainer from "../FlexContainer";
import CustomCheckBox from "./CustomCheckBox";
import TodoContent from "./TodoContent";
import EditAndDelete from "./EditAndDelete";

function TodoItem({ todoItem }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <FlexContainer
      className="px-4 gap-4 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FlexContainer className="flex-none">
        <CustomCheckBox todoItem={todoItem} />
      </FlexContainer>
      <FlexContainer className="flex-col leading-4">
        <TodoContent todoItem={todoItem} />
      </FlexContainer>
      {showOptions && (
        <FlexContainer className="flex-none text-2xl">
          <EditAndDelete todoItem={todoItem} />
        </FlexContainer>
      )}
    </FlexContainer>
  );
}

export default TodoItem;
