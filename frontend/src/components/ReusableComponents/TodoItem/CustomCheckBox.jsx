import React, { forwardRef, useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch } from "react-redux";

import FlexContainer from "../FlexContainer";
import useClasses from "../../../hooks/useClasses";
import Button from "../Button";

import dispatchToast from "../../../util/dispatchToast";

import { useEditTodoMutation, updateTodo } from "../../../store";

const CustomCheckBox = forwardRef(function CustomCheckBox(
  { className, todoItem, ...rest },
  ref
) {
  const [editTodo, results] = useEditTodoMutation();
  const { isError, isSuccess, data } = results;
  const [showCheck, setShowCheck] = useState(todoItem.isCompleted);
  const dispatch = useDispatch();

  const classNames = useClasses(
    "flex-none w-4 h-4 rounded-full items-center border border-todo-checkbox justify-center",
    "text-sm cursor-pointer active:scale-[1.1]",
    className
  );

  const handleMouseEnter = () => {
    setShowCheck(true);
  };

  const handleMouseLeave = () => {
    setShowCheck(false);
  };

  const handleClick = () => {
    editTodo({ ...todoItem, isCompleted: !todoItem.isCompleted });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateTodo(data));
      if (!data?.isCompleted) {
        dispatchToast("One task reverted!", "success");
      } else {
        dispatchToast("One task completed!", "success");
      }
    }

    if (isError) {
      dispatchToast("Task Completion Failed", "error");
    }
  }, [isSuccess, isError]);

  return (
    <Button
      type="button"
      className={classNames}
      ref={ref}
      {...rest}
      onMouseEnter={todoItem?.isCompleted ? null : handleMouseEnter}
      onMouseLeave={todoItem?.isCompleted ? null : handleMouseLeave}
      onClick={handleClick}
    >
      {showCheck && (
        <FlexContainer className="justify-center items-center">
          <IoCheckmark />
        </FlexContainer>
      )}
    </Button>
  );
});

export default CustomCheckBox;
