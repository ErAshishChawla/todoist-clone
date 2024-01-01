import FlexContainer from "../../../../ReusableComponents/FlexContainer";
import AddTaskLink from "./AppBarLinkComponents/AddTaskLink";
import InboxLink from "./AppBarLinkComponents/InboxLink";
import SearchLink from "./AppBarLinkComponents/SearchLink";
import TodayLink from "./AppBarLinkComponents/TodayLink";

function AppBarLinks() {
  return (
    <FlexContainer className="px-2.5 flex-none w-full flex-col">
      <AddTaskLink />
      <SearchLink />
      <InboxLink />
      <TodayLink />
    </FlexContainer>
  );
}

export default AppBarLinks;
