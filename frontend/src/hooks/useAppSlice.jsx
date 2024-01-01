import { useSelector } from "react-redux";

function useAppSlice() {
  return useSelector((state) => state.app);
}

export default useAppSlice;
