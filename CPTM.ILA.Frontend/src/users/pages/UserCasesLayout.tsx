import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

const UserCasesLayout = () => {
  const { areaTratamentoDados } = useContext(AuthContext);

  return (
    <React.Fragment>
      <h1>Olá, {areaTratamentoDados.nome}</h1>
      <Outlet />
    </React.Fragment>
  );
};

export default UserCasesLayout;
