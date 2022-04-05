import React from "react";
import { Outlet } from "react-router-dom";

const UserCasesLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default UserCasesLayout;
