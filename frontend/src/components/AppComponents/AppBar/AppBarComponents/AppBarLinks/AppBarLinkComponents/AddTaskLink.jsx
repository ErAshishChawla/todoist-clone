import AppBarButton from "../../ReusableAppBarComponents/AppBarButton";
import AddTaskFormModal from "../../../../AddTaskForm/AddTaskFormModal";

import { IoAddCircleSharp } from "react-icons/io5";
import CustomTooltip from "../../../../../ReusableComponents/CustomTooltip";

import useAppSlice from "../../../../../../hooks/useAppSlice";

import { useDispatch } from "react-redux";

import {
  setShowAddTaskForm,
  setShowAddTaskFormWithAppBar,
} from "../../../../../../store";

function AddTaskLink() {
  const { windowWidth } = useAppSlice();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (windowWidth <= 750) {
      dispatch(
        setShowAddTaskFormWithAppBar({
          showAddTaskForm: true,
          showAppBar: false,
        })
      );
      return;
    }
    dispatch(setShowAddTaskForm(true));
  };
  return (
    <CustomTooltip title="Add Task" arrow={false} placement="right">
      <AppBarButton
        icon={<IoAddCircleSharp />}
        text="Add Task"
        onClick={handleClick}
      />
    </CustomTooltip>
  );
}

export default AddTaskLink;
