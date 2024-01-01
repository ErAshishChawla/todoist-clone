import React from "react";

import FlexContainer from "../FlexContainer";
import { Flex } from "antd";
import DueDate from "./DueDate";

function TodoContent({ todoItem }) {
  return (
    <FlexContainer className="flex-col break-all gap-1">
      <FlexContainer className="text-md flex-col ">
        {todoItem?.taskName}
      </FlexContainer>
      {todoItem?.taskDescription && (
        <FlexContainer className="text-sm text-todo-description">
          {todoItem?.taskDescription}
        </FlexContainer>
      )}
      {todoItem?.dueDate && (
        <FlexContainer className="text-xs">
          <DueDate todoItem={todoItem} />
        </FlexContainer>
      )}
    </FlexContainer>
  );
}

export default TodoContent;
