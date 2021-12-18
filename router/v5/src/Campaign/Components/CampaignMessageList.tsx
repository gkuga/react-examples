import React from "react";
import { useHistory } from "react-router-dom";

const CampaignMessageListComponent = () => {
  const history = useHistory();
  return (
    <div className="row">
      <p>Campaign Message List</p>
      <button onClick={history.goBack}>Go Back</button>
    </div>
  );
};

export default CampaignMessageListComponent;
