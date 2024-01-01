import { forwardRef, useEffect, useMemo } from "react";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import FlexContainer from "../../ReusableComponents/FlexContainer";
import TaskNameInput from "./AddTaskFormComponents/TaskNameInput";
import DescriptionInput from "./AddTaskFormComponents/DescriptionInput";
import AddTaskButton from "./AddTaskFormComponents/AddTaskButton";
import CancelButton from "./AddTaskFormComponents/CancelButton";
import AddTaskFormDatePicker from "./AddTaskFormComponents/AddTaskFormDatePicker";
import AddTaskFormTimePicker from "./AddTaskFormComponents/AddTaskFormTimePicker";
import ListTypeDropDown from "./AddTaskFormComponents/ListTypeDropDown";

import useClasses from "../../../hooks/useClasses";
import dispatchToast from "../../../util/dispatchToast";

import { setShowAddTaskForm, useAddTodoMutation } from "../../../store";

const AddTaskForm = forwardRef(function AddTaskForm(props, ref) {
  const { className, ...rest } = props;
  const [addTodo, results] = useAddTodoMutation();
  const { data, isLoading, isError, isSuccess } = results;
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    taskName: Yup.string().required("Required"),
    taskDescription: Yup.string(),
    dueDate: Yup.string(),
    listTypeId: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      taskName: "",
      taskDescription: "",
      dueDate: "",
      listTypeId: "inbox",
    },
    validationSchema,
    onSubmit: (values) => {
      addTodo(values);
    },
  });

  const classNames = useClasses(
    "bg-addTask-form flex-1 max-w-[36rem] p-4 z-20 rounded-lg",
    className
  );

  useEffect(() => {
    if (isError) {
      dispatchToast("Adding Todo Failed!", "error");
    }

    if (isSuccess) {
      dispatchToast(
        <span>
          Todo added to <span className="capitalize">{data?.listType}</span>
        </span>,
        "success"
      );
      dispatch(setShowAddTaskForm(false));
    }
  }, [isError, isSuccess]);

  const handleCancelClick = (e) => {
    dispatch(setShowAddTaskForm(false));
  };

  const datePicker = useMemo(() => {
    return <AddTaskFormDatePicker formik={formik} />;
  }, [formik.values.dueDate]);

  const timePicker = useMemo(() => {
    return <AddTaskFormTimePicker formik={formik} />;
  }, [formik.values.dueDate]);

  const listTypeSelector = useMemo(() => {
    return <ListTypeDropDown formik={formik} />;
  }, [formik.values.listTypeId]);

  return (
    <form
      ref={ref}
      className={classNames}
      {...rest}
      onSubmit={formik.handleSubmit}
    >
      <FlexContainer className="flex-col gap-1">
        <FlexContainer className="flex-col gap-2">
          <TaskNameInput formik={formik} />
          <DescriptionInput formik={formik} />
        </FlexContainer>
        <FlexContainer className="gap-4">
          {datePicker}
          {timePicker}
          {listTypeSelector}
        </FlexContainer>
      </FlexContainer>

      <Divider />
      <FlexContainer className="flex-row items-center justify-end gap-2.5">
        <CancelButton onClick={handleCancelClick} formik={formik} />
        <AddTaskButton
          type="submit"
          formik={formik}
          isFormSubmitting={isLoading}
        />
      </FlexContainer>
    </form>
  );
});
export default AddTaskForm;
