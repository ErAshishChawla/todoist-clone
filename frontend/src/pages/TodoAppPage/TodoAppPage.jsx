import ResponsiveAppBar from "../../components/AppComponents/AppBar/ResponsiveAppBar";
import AppBarToggleButton from "../../components/AppComponents/AppBar/AppBarComponents/AppBarHeader/AppBarHeaderContent/AppBarToggleButton";
import ContentContainer from "../../components/AppComponents/ContentContainer/ContentContainer";
import FlexContainer from "../../components/ReusableComponents/FlexContainer";
import AddTaskFormModal from "../../components/AppComponents/AddTaskForm/AddTaskFormModal";
import ResendVerificationEmailMessage from "../../components/AppComponents/AuthForms/ResendVerificationEmail/ResendVerificationEmailMessage";
import ProjectFormModal from "../../components/AppComponents/ProjectForm/ProjectFormModal";
import dispatchNeverClosingToast from "../../util/dispatchNeverClosingToast";
import EditTaskFormModal from "../../components/AppComponents/EditTaskForm/EditTaskFormModal";

import useAppBarSlice from "../../hooks/useAppBarSlice";
import useReduxDispatch from "../../hooks/useReduxDispatch";
import useClasses from "../../hooks/useClasses";

import {
  setIsResizing,
  setAppBarWidth,
  setWindowWidth,
  userIsVerifiedSelector,
  showProjectFormSelector,
} from "../../store";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function TodoAppPage() {
  const { showAppBar, isResizing, showAddTaskForm, showEditTaskForm } =
    useAppBarSlice();
  const isVerified = useSelector(userIsVerifiedSelector);
  const showProjectForm = useSelector(showProjectFormSelector);
  const dispatch = useReduxDispatch();

  const handleMouseMove = (e) => {
    e.preventDefault();
    const newWidth = e.clientX;
    if (newWidth < 220 || newWidth > 440) {
      return;
    }
    dispatch(setAppBarWidth(newWidth));
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    dispatch(setIsResizing(false));
  };

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.addEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (!isVerified) {
      dispatchNeverClosingToast(
        <ResendVerificationEmailMessage />,
        "warning",
        "unVerifiedUserEmail"
      );
    }
  }, [isVerified]);

  return (
    <FlexContainer className="w-full h-full">
      {showAppBar && <ResponsiveAppBar />}
      <ContentContainer
        onMouseMove={isResizing ? handleMouseMove : null}
        onMouseUp={isResizing ? handleMouseUp : null}
        className={useClasses(
          "flex-col items-center justify-start overflow-y-auto",
          {
            "cursor-col-resize": isResizing,
          }
        )}
      >
        {!showAppBar && <AppBarToggleButton className="fixed left-4 top-4 " />}
        <FlexContainer className="max-w-[750px] flex-col px-12 w-full">
          <Outlet />
        </FlexContainer>
        {showAddTaskForm && <AddTaskFormModal />}
        {showEditTaskForm && <EditTaskFormModal />}
        {showProjectForm && <ProjectFormModal />}
      </ContentContainer>
    </FlexContainer>
  );
}

export default TodoAppPage;
