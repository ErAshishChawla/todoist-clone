import AppBarButton from "../../ReusableAppBarComponents/AppBarButton";
import { IoSearch } from "react-icons/io5";

import CustomTooltip from "../../../../../ReusableComponents/CustomTooltip";

function SearchLink() {
  return (
    <CustomTooltip title="Search" placement="right" arrow={false}>
      <AppBarButton icon={<IoSearch />} text="Search" />
    </CustomTooltip>
  );
}

export default SearchLink;
