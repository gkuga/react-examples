import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import CampaignMessageListComponent from "./Components/CampaignMessageList";
import CampaignDetailComponent from "./Components/CampaignDetail";
import CampaignContactListComponent from "./Components/CampaignContactList";

const CampaignComponent = () => {
  const { path } = useRouteMatch();

  return (
    <div className="campaign-list">
      <Switch>
        <Route
          path={`${path}/:id/messages`}
          component={CampaignMessageListComponent}
        />
        <Route
          path={`${path}/:id/contacts`}
          component={CampaignContactListComponent}
        />
        <Route path={`${path}/:id`} component={CampaignDetailComponent} />
      </Switch>
    </div>
  );
};

export default CampaignComponent;
