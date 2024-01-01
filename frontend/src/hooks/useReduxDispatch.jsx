import { useDispatch } from "react-redux";

function useReduxDispatch() {
  const dispatch = useDispatch();
  return dispatch;
}

export default useReduxDispatch;
