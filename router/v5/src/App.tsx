import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import CampaignComponent from "./Campaign/Campaign";
import CampaignListComponent from "./Campaign/Components/CampaignList";
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>Sample app to demonstrate React Router issue</h3>
      <HashRouter>
        <div className="campaign-container">
          <div className="campaign-list">
            <Route path="/admin/campaigns">
              <CampaignListComponent />
            </Route>
          </div>
          <div className="campaign-detail">
            <Switch>
              <Route path="/admin/campaigns" component={CampaignComponent} />
              <Redirect from="*" to="/admin/campaigns" />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
