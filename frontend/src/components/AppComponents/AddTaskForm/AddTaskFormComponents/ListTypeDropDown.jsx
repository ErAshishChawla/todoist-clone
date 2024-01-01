import React, { forwardRef, useMemo } from "react";
import { Select } from "antd";
import { HiOutlineInbox } from "react-icons/hi2";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/tb";

import useClasses from "../../../../hooks/useClasses";

import FlexContainer from "../../../ReusableComponents/FlexContainer";

import { userProjectsSelector } from "../../../../store";

const ListTypeDropDown = forwardRef(function ListTypeDropDown(
  { className, formik, ...rest },
  ref
) {
  const userProjects = useSelector(userProjectsSelector);

  const inbox = useMemo(() => {
    return (
      <FlexContainer className="items-center gap-2">
        <HiOutlineInbox />
        Inbox
      </FlexContainer>
    );
  }, []);

  const userProjectsOptions = useMemo(() => {
    const options = userProjects.map((project) => {
      const label = (
        <FlexContainer className="items-center gap-2 justify-start">
          <FlexContainer className="flex-none">
            {Icons[project.icon]()}
          </FlexContainer>

          <div className="capitalize overflow-hidden text-ellipsis whitespace-nowrap">
            {project.title}
          </div>
        </FlexContainer>
      );
      return {
        value: project.randomId,
        label,
      };
    });

    return [{ value: "inbox", label: inbox }, ...options];
  }, [userProjects]);
  const classNames = useClasses("w-32", className);

  const handleChange = (value) => {
    return formik.handleChange({
      target: {
        name: "listTypeId",
        value: value,
      },
    });
  };

  return (
    <Select
      value={formik.values?.listTypeId}
      className={classNames}
      onChange={handleChange}
      {...rest}
      ref={ref}
      name="listTypeId"
      options={userProjectsOptions}
    />
  );
});

export default ListTypeDropDown;
