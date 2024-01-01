import React from "react";

import FlexContainer from "../FlexContainer";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

function EditAndDelete({ todoItem }) {
  return (
    <FlexContainer className="gap-4 justify-center">
      <EditTodo todoItem={todoItem} />
      <DeleteTodo todoItem={todoItem} />
    </FlexContainer>
  );
}

export default EditAndDelete;
