import React from "react";
import { Outlet } from "react-router-dom";

const AccessRequestPage = (props: any) => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default AccessRequestPage;
