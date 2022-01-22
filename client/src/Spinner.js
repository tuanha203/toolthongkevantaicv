import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export const Spinner = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({ area: area, delay: 0 });
  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="Oval" color="#321fdb" height="60" width="60" />
      </div>
    )
  );
};
