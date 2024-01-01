import React, { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import {
  editTaskFormTodoSelector,
  setShowEditTaskFormWithTodoData,
  updateTodo,
  useEditTodoMutation,
} from "../store";
import dispatchToast from "../util/dispatchToast";

const EditTaskFormContext = createContext(null);

function EditTaskFormContextProvider({ children }) {
  const [editTodo, results] = useEditTodoMutation();
  const { isError, isSuccess, data } = results;

  const dispatch = useDispatch();

  const editTaskFormTodoId = useSelector(editTaskFormTodoSelector);
  const editTaskFormTodo = useSelector((state) => {
    return state.todos.find((todo) => {
      return todo._id === editTaskFormTodoId;
    });
  });
  const { taskName, taskDescription, dueDate, listTypeId } = editTaskFormTodo;

  const validationSchema = Yup.object({
    taskName: Yup.string().required(),
    taskDescription: Yup.string(),
    listTypeId: Yup.string(),
    dueDate: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      taskName,
      taskDescription,
      listTypeId,
      dueDate,
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = { ...editTaskFormTodo, ...values };
      editTodo(payload);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateTodo(data));
      dispatchToast("Todo Saved Successfully", "success");
    }

    if (isError) {
      dispatchToast("Error Saving Todo", "error");
    }
  }, [isSuccess, isError]);

  const handleCloseClick = () => {
    dispatch(
      setShowEditTaskFormWithTodoData({
        showEditTaskForm: false,
        todo: null,
      })
    );
  };

  const values = {
    editTaskFormTodo,
    formik,
    handleCloseClick,
  };

  return (
    <EditTaskFormContext.Provider value={values}>
      {children}
    </EditTaskFormContext.Provider>
  );
}

export default EditTaskFormContextProvider;

export { EditTaskFormContext };
