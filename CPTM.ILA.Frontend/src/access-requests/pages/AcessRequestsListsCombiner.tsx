import React from "react";
import ComiteAccessRequestsListGetter from "../components/ComiteAccessRequestsListGetter";
import GroupsAccessRequestsListGetter from "../components/GroupsAccessRequestsListGetter";
import InitialAccessRequestsListGetter from "../components/InitialAccessRequestsListGetter";

const AcessRequestsListsCombiner = () => {
  return (
    <React.Fragment>
      <InitialAccessRequestsListGetter />
      <GroupsAccessRequestsListGetter />
      <ComiteAccessRequestsListGetter />
    </React.Fragment>
  );
};

export default AcessRequestsListsCombiner;
