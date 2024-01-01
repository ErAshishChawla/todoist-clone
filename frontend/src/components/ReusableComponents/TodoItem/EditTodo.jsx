import React from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";

import { setShowEditTaskFormWithTodoData } from "../../../store";

import Button from "../Button";

function EditTodo({ todoItem }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setShowEditTaskFormWithTodoData({
        showEditTaskForm: true,
        todo: todoItem._id,
      })
    );
  };

  return (
    <>
      <Button
        className="cursor-pointer active:scale-[1.1] p-0"
        onClick={handleClick}
      >
        <CiEdit />
      </Button>
    </>
  );
}

export default EditTodo;
