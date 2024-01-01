import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserOptionItem from "./UserOptionItem";

import dispatchToast from "../../../../../../../util/dispatchToast";

import { useLogoutMutation } from "../../../../../../../store";
import { toast } from "react-toastify";

function LogoutItem() {
  const [logoutUser, results] = useLogoutMutation();
  const { isError, isSuccess, error } = results;

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutUser();
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
      dispatchToast(error.data.errorMessage, "error");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/", {
        replace: true,
      });
      toast.dismiss("unVerifiedUserEmail");
      dispatchToast(`User logged out successfully`, "success");
    }
  }, [isSuccess]);

  return (
    <UserOptionItem onClick={handleLogoutClick} className="p-0">
      Logout
    </UserOptionItem>
  );
}

export default LogoutItem;
