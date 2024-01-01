import LoadingPage from "../../pages/LoadingPage";

import { useFetchUserQuery } from "../../store";

import { Navigate } from "react-router-dom";

function CheckSession({ children }) {
  const results = useFetchUserQuery();
  const { isLoading, isFetching, error, data, isUninitialized, isSuccess } =
    results;

  let content;

  if (isLoading || isFetching || isUninitialized) {
    content = <LoadingPage />;
  } else if (error && isUninitialized) {
    content = <LoadingPage />;
  } else if (error && !isUninitialized) {
    content = <Navigate to="/auth/login" replace="true" />;
  } else if (isSuccess) {
    content = children;
  }
  return content;
}

export default CheckSession;
