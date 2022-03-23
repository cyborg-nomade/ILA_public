import React from "react";
import { Outlet } from "react-router-dom";

const AllAccessRequestsPage = (props: any) => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default AllAccessRequestsPage;
