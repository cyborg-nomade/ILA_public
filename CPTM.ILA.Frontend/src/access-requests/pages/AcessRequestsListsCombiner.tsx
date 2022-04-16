import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ComiteAccessRequestsListGetter from "../components/ComiteAccessRequestsListGetter";
import GroupsAccessRequestsListGetter from "../components/GroupsAccessRequestsListGetter";
import InitialAccessRequestsListGetter from "../components/InitialAccessRequestsListGetter";

const AcessRequestsListsCombiner = () => {
  const { user } = useContext(AuthContext);

  return (
    <React.Fragment>
      <InitialAccessRequestsListGetter />
      <GroupsAccessRequestsListGetter />
      {user.isDpo && <ComiteAccessRequestsListGetter />}
    </React.Fragment>
  );
};

export default AcessRequestsListsCombiner;
