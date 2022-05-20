import React from "react";
import GroupsAccessRequestsListGetter from "../components/GroupsAccessRequestsListGetter";
import InitialAccessRequestsListGetter from "../components/InitialAccessRequestsListGetter";

const AcessRequestsListsCombiner = () => {
  // const { user } = useContext(AuthContext);

  return (
    <React.Fragment>
      {/*{user.isDPO && <ComiteAccessRequestsListGetter />}*/}
      <InitialAccessRequestsListGetter />
      <GroupsAccessRequestsListGetter />
    </React.Fragment>
  );
};

export default AcessRequestsListsCombiner;
