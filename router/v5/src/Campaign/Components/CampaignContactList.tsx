import React from "react";
import { useHistory } from "react-router-dom";

const CampaignContactListComponent = () => {
  const history = useHistory();
  return (
    <div className="row">
      <p>Campaign Contact List</p>
      <button onClick={history.goBack}>Go Back</button>
    </div>
  );
};

export default CampaignContactListComponent;
