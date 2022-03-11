import React from "react";
import { Outlet } from "react-router-dom";

const AllCasesPage = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default AllCasesPage;
