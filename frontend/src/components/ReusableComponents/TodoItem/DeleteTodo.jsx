import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";

import { useDeleteTodoMutation, deleteTodo } from "../../../store";
import Button from "../Button";
import { useEffect } from "react";
import dispatchToast from "../../../util/dispatchToast";

function DeleteTodo({ todoItem }) {
  const dispatch = useDispatch();
  const [removeTodo, results] = useDeleteTodoMutation();

  const { isSuccess, isError, data } = results;

  const handleClick = () => {
    removeTodo(todoItem);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (isSuccess) {
      dispatch(deleteTodo(data));
      dispatchToast("Todo Deleted Successfully", "success");
    }
    if (isError) {
      dispatchToast("Error! in deleting todo", "error");
    }
  }, [isSuccess, isError, data]);

  return (
    <Button
      className="flex-none cursor-pointer active:scale-[1.1] p-0"
      onClick={handleClick}
    >
      <CiTrash />
    </Button>
  );
}

export default DeleteTodo;
