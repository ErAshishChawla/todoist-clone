import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Dropdown } from "antd";

import Button from "../../../../ReusableComponents/Button";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";

function ProjectOptionsDropdown({ project }) {
  const items = [
    {
      key: "1",
      label: <EditProject project={project} />,
    },
    {
      key: "2",
      label: <DeleteProject project={project} />,
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      trigger={["click"]}
      overlayClassName="w-32 "
    >
      <Button className="flex-none p-0">
        <IoEllipsisHorizontalSharp />
      </Button>
    </Dropdown>
  );
}

export default ProjectOptionsDropdown;
