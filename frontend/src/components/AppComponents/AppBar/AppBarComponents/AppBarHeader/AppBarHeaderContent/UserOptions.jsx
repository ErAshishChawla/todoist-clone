import FlexContainer from "../../../../../ReusableComponents/FlexContainer";
import Button from "../../../../../ReusableComponents/Button";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

import { forwardRef } from "react";
import { useSelector } from "react-redux";

import useClasses from "../../../../../../hooks/useClasses";

import { userEmailSelector } from "../../../../../../store";

import { IoChevronDown } from "react-icons/io5";
import LogoutItem from "./UserOptionItems/LogoutItem";
import { Dropdown } from "antd";

const UserOptions = forwardRef(function UserOptions(props, ref) {
  const userEmail = useSelector(userEmailSelector);
  const iconSize = 18;
  const userName = userEmail?.split("@")[0];
  const { className, ...rest } = props;

  const classNames = useClasses(
    "p-0 items-center gap-2 hover:bg-appbar-item-hover px-1.5 py-1 justify-between active:scale-[0.98] items-center flex-none ",
    className
  );

  const items = [
    {
      key: 1,
      label: "Settings",
      icon: <IoSettingsOutline size={iconSize} />,
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: <LogoutItem />,
      icon: <IoLogOutOutline size={iconSize} />,
    },
  ];

  return (
    <FlexContainer className="flex-none w-full">
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        trigger={["click"]}
        overlayClassName="w-[200px] overflow-hidden"
      >
        <Button className={classNames} {...rest} ref={ref}>
          <FlexContainer className="w-7 h-7 rounded-full bg-avatar flex-none justify-center text-avatar-text text-lg text-center">
            {userName[0]}
          </FlexContainer>
          <FlexContainer className="flex-none text-sm font-bold capitalize max-w-[75px] overflow-hidden">
            {userName}
          </FlexContainer>
          <FlexContainer className="flex-none">
            <IoChevronDown />
          </FlexContainer>
        </Button>
      </Dropdown>
    </FlexContainer>
  );
});

export default UserOptions;
