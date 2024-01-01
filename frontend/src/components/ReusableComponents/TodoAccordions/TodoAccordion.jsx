import React from "react";
import { Collapse, Divider } from "antd";

import FlexContainer from "../FlexContainer";
import TodoItem from "../TodoItem/TodoItem";

function TodoAccordion({ todos, filterFn, accordionTitle }) {
  let filteredTodos;
  if (!todos?.length > 0 || !todos) {
    filteredTodos = [];
  } else {
    filteredTodos = todos.filter(filterFn);
  }

  const renderedTodos = filteredTodos.map((todo) => {
    return (
      <FlexContainer className="flex-col gap-2" key={todo._id}>
        <TodoItem todoItem={todo} />
        <Divider className="m-0" />
      </FlexContainer>
    );
  });

  const items = [
    {
      key: 1,
      label: (
        <FlexContainer className="font-bold flex-col">
          <FlexContainer>{accordionTitle}</FlexContainer>
          <Divider className="m-0" />
        </FlexContainer>
      ),
      children: (
        <FlexContainer className="flex-col gap-3 px-6">
          {!renderedTodos?.length > 0 ? "No Tasks!" : renderedTodos}
        </FlexContainer>
      ),
    },
  ];
  return (
    <FlexContainer className="flex-col">
      <Collapse defaultActiveKey={["1"]} ghost items={items} />
    </FlexContainer>
  );
}

export default TodoAccordion;
