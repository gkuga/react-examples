import React, { useState } from "react";
import { Link, generatePath, useRouteMatch } from "react-router-dom";

const CampaignListComponent = () => {
  const [campaignList, setCampaignList] = useState([
    { id: 1, name: "Campaign1" },
    { id: 2, name: "Campaign2" },
    { id: 3, name: "Campaign3" },
    { id: 4, name: "Campaign4" },
    { id: 5, name: "Campaign5" }
  ]);
  const { url } = useRouteMatch();

  return (
    <div style={{ width: "90%" }}>
      {campaignList.map(({ id, name }) => (
        <div className="campaign-list-item" key={id}>
          <Link to={generatePath(`${url}/:id`, { id })}>{name}</Link>
        </div>
      ))}
    </div>
  );
};

export default CampaignListComponent;
