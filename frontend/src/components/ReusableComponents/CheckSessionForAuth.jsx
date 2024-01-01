import LoadingPage from "../../pages/LoadingPage";

import { useFetchUserQuery } from "../../store";

import { Navigate } from "react-router-dom";

function CheckSessionForAuth({ children }) {
  const results = useFetchUserQuery();
  const { isLoading, isFetching, error, data, isUninitialized, isSuccess } =
    results;

  let content;
  if (isLoading || isFetching || isUninitialized) {
    content = <LoadingPage />;
  } else if (error && isUninitialized) {
    content = <LoadingPage />;
  } else if (error && !isUninitialized) {
    content = children;
  } else if (isSuccess) {
    content = <Navigate to="/app/today" replace={true} />;
  }
  return content;
}

export default CheckSessionForAuth;
