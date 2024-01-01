import { useSelector } from "react-redux";

function useAppBarSlice() {
  return useSelector((state) => state.appBar);
}

export default useAppBarSlice;
